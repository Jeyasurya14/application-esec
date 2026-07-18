import { inject, Injectable } from '@angular/core';
import { ProcedureApiService } from '../data/services';
import { DataSource } from './datasource';
import { DataSourceRequest, DataSourceResponse } from './models';
import { Observable, map } from 'rxjs';
import { FilterDefinition, FilterState } from '../filters';

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
    const paramNames = datasource.getProcedureParams();
    if (paramNames.length === 0) {
      return this.procedureApi
        .execute<T>(`CALL ${procedureName}`)
        .pipe(
          map((rows) =>
            this.applyFilters(rows, datasource.getFilterDefinitions(), request.filters),
          ),
        );
    }

    const paramValues = paramNames
      .map((name) => {
        const val = request.filters[name];
        return escapeSql(val);
      })
      .join(', ');

    const sql = `CALL ${procedureName}(${paramValues})`;
    return this.procedureApi
      .execute<T>(sql)
      .pipe(
        map((rows) => this.applyFilters(rows, datasource.getFilterDefinitions(), request.filters)),
      );
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

      default:
        return true;
    }
  }
}
