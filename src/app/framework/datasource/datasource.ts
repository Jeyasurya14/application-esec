import { Observable } from 'rxjs';
import { DataSourceColumn, DataSourceRequest, DataSourceResponse } from './models';
import { FilterDefinition } from '../filters/models/filter-definition.model';
import { inject } from '@angular/core';
import { DataSourceEngine } from './datasource-engine';

export abstract class DataSource<T> {
  private readonly engine = inject(DataSourceEngine);
  protected abstract readonly columns: readonly DataSourceColumn[];

  protected readonly table?: string;
  protected readonly procedure?: string;

  protected readonly procedureParams?: readonly string[];

  protected readonly filterDefinitions?: readonly FilterDefinition[] = [];

  getTable(): string | undefined {
    return this.table;
  }

  getProcedure(): string | undefined {
    return this.procedure;
  }

  getProcedureParams(): readonly string[] {
    return this.procedureParams ?? [];
  }

  getColumns(): readonly DataSourceColumn[] {
    return this.columns;
  }

  getFilterDefinitions(): readonly FilterDefinition[] {
    return this.filterDefinitions ?? [];
  }

  load(request: DataSourceRequest): Observable<DataSourceResponse<T>> {
    return this.engine.load(this, request);
  }
}
