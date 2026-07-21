import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { datasourceColumns } from '../../../framework/columns';
import { DataSource } from '../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../framework/datasource/models';

export interface LicensePlaceholderRow {
  report: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class LicensePlaceholderDataSource extends DataSource<LicensePlaceholderRow> {
  protected override columns = datasourceColumns('report', 'status');

  override load(
    _request: DataSourceRequest,
  ): Observable<DataSourceResponse<LicensePlaceholderRow>> {
    return of({ rows: [], totalRows: 0 });
  }
}
