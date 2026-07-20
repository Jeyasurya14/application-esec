import { inject, Injectable } from '@angular/core';
import { ProcedureApiService } from '../data/services';
import { DataSource } from './datasource';
import { DataSourceRequest, DataSourceResponse } from './models';
import { Observable, map } from 'rxjs';
import { FilterConfig, FilterDefinition, FilterState } from '../filters';

function escapeSql(val: unknown): string {
  if (val === null || val === undefined) return 'NULL';
  const str = String(val);
  return `'${str.replace(/'/g, "\\'")}'`;
}

@Injectable({
  providedIn: 'root',
})
export class DataSourceEngine {
  private readonly procedureApi = inject(ProcedureApiService);

  load<T>(
    datasource: DataSource<T>,
    request: DataSourceRequest,
  ): Observable<DataSourceResponse<T>> {
    const procedureName = datasource.getProcedure();
    if (!procedureName) {
      throw new Error('DataSource must have a procedure defined');
    }
    return this.executeProcedure<T>(datasource, procedureName, request);
  }

  private executeProcedure<T>(
    datasource: DataSource<T>,
    procedureName: string,
    request: DataSourceRequest,
  ): Observable<DataSourceResponse<T>> {
    const config = request.filterConfig;
    const paramNames = datasource.getProcedureParams();
    const sql = this.buildSql(procedureName, paramNames, request.filters, config);

    const allDefs = this.buildFilterDefs(datasource, config);

    return this.procedureApi
      .execute<T>(sql)
      .pipe(map((rows) => this.applyFilters(rows, allDefs, request.filters)));
  }

  private buildSql(
    procedureName: string,
    paramNames: readonly string[],
    filters: FilterState,
    config?: FilterConfig,
  ): string {
    if (paramNames.length === 0) {
      return `CALL ${procedureName}`;
    }

    const paramValues = paramNames
      .map((name) => {
        const control = config?.controls.find((c) => c.param === name || c.id === name);
        const filterKey = control ? control.id : name;
        return escapeSql(filters[filterKey]);
      })
      .join(', ');

    return `CALL ${procedureName}(${paramValues})`;
  }

  private buildFilterDefs<T>(
    datasource: DataSource<T>,
    config?: FilterConfig,
  ): readonly FilterDefinition[] {
    const dsDefs = datasource.getFilterDefinitions();

    if (!config) return dsDefs;

    const autoDefs: FilterDefinition[] = config.controls
      .filter((c) => c.filter)
      .map((c) => ({
        id: c.id,
        type: c.filter!.type,
        field: c.filter!.field,
        fields: c.filter!.fields,
        valueFieldMap: c.filter!.valueFieldMap,
      }));

    return [...dsDefs, ...autoDefs];
  }

  private applyFilters<T>(
    rows: readonly T[],
    definitions: readonly FilterDefinition[],
    filters: FilterState,
  ): DataSourceResponse<T> {
    if (!definitions || definitions.length === 0) {
      return { rows, totalRows: rows.length };
    }

    const filtered = rows.filter((row) => this.matchesFilters(row, definitions, filters));
    return { rows: filtered, totalRows: filtered.length };
  }

  private matchesFilters<T>(
    row: T,
    definitions: readonly FilterDefinition[],
    filters: FilterState,
  ): boolean {
    for (const def of definitions) {
      const value = filters[def.id];
      if (value === undefined) continue;
      if (typeof value === 'string' && value === '') continue;
      if (Array.isArray(value) && value.length === 0) continue;

      if (!this.matchesDefinition(row, def, value)) return false;
    }
    return true;
  }

  private matchesDefinition<T>(row: T, def: FilterDefinition, value: unknown): boolean {
    const fields: readonly string[] =
      def.fields && def.fields.length > 0 ? def.fields : [def.field];

    switch (def.type) {
      case 'contains': {
        const searchStr = String(value).toLowerCase();
        return fields.some((field: string) => {
          const fieldVal = (row as Record<string, unknown>)[field];
          return fieldVal != null && String(fieldVal).toLowerCase().includes(searchStr);
        });
      }

      case 'equals': {
        const compareVal = String(value).toLowerCase();
        return fields.some((field: string) => {
          const fieldVal = (row as Record<string, unknown>)[field];
          return fieldVal != null && String(fieldVal).toLowerCase() === compareVal;
        });
      }

      case 'startsWith': {
        const searchStr = String(value).toLowerCase();
        return fields.some((field: string) => {
          const fieldVal = (row as Record<string, unknown>)[field];
          return fieldVal != null && String(fieldVal).toLowerCase().startsWith(searchStr);
        });
      }

      case 'endsWith': {
        const searchStr = String(value).toLowerCase();
        return fields.some((field: string) => {
          const fieldVal = (row as Record<string, unknown>)[field];
          return fieldVal != null && String(fieldVal).toLowerCase().endsWith(searchStr);
        });
      }

      case 'in': {
        if (!Array.isArray(value)) return true;
        const fieldVal = (row as Record<string, unknown>)[def.field];
        return value.includes(fieldVal);
      }

      case 'between': {
        if (!Array.isArray(value) || value.length < 2) return true;
        const [start, end] = value as [string | number, string | number];
        const fieldVal = (row as Record<string, unknown>)[def.field] as
          string | number | null | undefined;
        if (fieldVal == null) return false;
        return start <= fieldVal && fieldVal <= end;
      }

      case 'greaterThan': {
        const fieldVal = (row as Record<string, unknown>)[def.field] as
          string | number | null | undefined;
        if (fieldVal == null) return false;
        return fieldVal > (value as string | number);
      }

      case 'lessThan': {
        const fieldVal = (row as Record<string, unknown>)[def.field] as
          string | number | null | undefined;
        if (fieldVal == null) return false;
        return fieldVal < (value as string | number);
      }

      case 'isNull': {
        const fieldVal = (row as Record<string, unknown>)[def.field];
        return fieldVal === null || fieldVal === undefined;
      }

      case 'isNotNull': {
        const fieldVal = (row as Record<string, unknown>)[def.field];
        return fieldVal !== null && fieldVal !== undefined;
      }

      case 'periodRange': {
        const raw = (row as Record<string, unknown>)[def.field] as string | undefined;
        if (!raw) return false;
        const rowDate = new Date(raw);
        if (isNaN(rowDate.getTime())) return false;

        const val = String(value);
        let start: Date;
        let end = new Date();

        if (val === 'YTD') {
          start = new Date(end.getFullYear(), 0, 1);
        } else {
          const num = parseInt(val, 10);
          if (!isNaN(num)) {
            start = new Date();
            start.setDate(start.getDate() - num);
          } else {
            const qm = val.match(/^Q([1-4])-(\d{4})$/);
            if (qm) {
              const q = parseInt(qm[1], 10);
              const y = parseInt(qm[2], 10);
              start = new Date(y, (q - 1) * 3, 1);
              end = new Date(y, q * 3, 0);
            } else {
              const ym = val.match(/^\d{4}$/);
              if (ym) {
                const y = parseInt(ym[0], 10);
                start = new Date(y, 0, 1);
                end = new Date(y, 11, 31);
              } else {
                return true;
              }
            }
          }
        }
        return rowDate >= start && rowDate <= end;
      }

      case 'optionMatch': {
        const map = def.valueFieldMap;
        if (!map) return true;
        const field = map[String(value)];
        if (!field) return true;
        const fieldVal = (row as Record<string, unknown>)[field];
        return fieldVal != null && Number(fieldVal) > 0;
      }

      default:
        return true;
    }
  }
}
