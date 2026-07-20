import { Injectable } from '@angular/core';
import { DataSource } from '../../framework/datasource/datasource';
import { DataSourceColumn } from '../../framework/datasource/models';
import { datasourceColumns } from '../../framework/columns';

@Injectable()
export class InlineDataSource extends DataSource<unknown> {
  protected override procedure = '';
  protected override columns: readonly DataSourceColumn[] = [];
  protected override procedureParams: readonly string[] = [];

  configure(procedure: string, columnFields: readonly string[], params?: readonly string[]) {
    this.procedure = procedure;
    this.columns = datasourceColumns(...columnFields);
    if (params) this.procedureParams = params;
  }
}
