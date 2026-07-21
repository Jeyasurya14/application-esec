import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '../../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../../framework/datasource/models';
import { FilterState } from '../../../../framework/filters';
import { datasourceColumns } from '../../../../framework/columns';
import { Computer } from './computer.model';

@Injectable({
  providedIn: 'root',
})
export class ComputerDataSource extends DataSource<Computer> {
  protected override procedure = 'esms_m.r_license_wksn';
  protected override columns = datasourceColumns(
        'wksn',
        'server',
        'lic',
        'lic_name',
        'access',
        'access_date',
        'access_time',
        'denial',
        'denial_date',
        'denial_time',
  );
  protected override procedureParams = ['user_id'];

  override load(request: DataSourceRequest): Observable<DataSourceResponse<Computer>> {
    const filters: FilterState = {
      user_id: 'webtest123',
      range: 'YTD',
      option: 'All',
      ...request.filters,
    };
    return super.load({ ...request, filters });
  }
}
