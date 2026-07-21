import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '../../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../../framework/datasource/models';
import { FilterState } from '../../../../framework/filters';
import { datasourceColumns } from '../../../../framework/columns';
import { Borrow } from './borrow.model';

@Injectable({
  providedIn: 'root',
})
export class BorrowDataSource extends DataSource<Borrow> {
  protected override procedure = 'esms_m.r_borrow_grid';
  protected override columns = datasourceColumns(
    'sw',
    'server',
    'location',
    'lic',
    'lic_name',
    'user_id',
    'user_name',
    'region',
    'country',
    'divn',
    'dept',
    'section',
    'rpt_id',
    'city',
    'state',
    'bldg',
    'count',
    'status',
    'bundle',
  );
  protected override procedureParams = ['user_id', 'range', 'option'];

  override load(request: DataSourceRequest): Observable<DataSourceResponse<Borrow>> {
    const filters: FilterState = {
      user_id: 'webtest123',
      range: 'YTD',
      option: 'All',
      ...request.filters,
    };
    return super.load({ ...request, filters });
  }
}
