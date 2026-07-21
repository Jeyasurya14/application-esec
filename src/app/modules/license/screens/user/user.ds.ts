import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '../../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../../framework/datasource/models';
import { FilterState } from '../../../../framework/filters';
import { datasourceColumns } from '../../../../framework/columns';
import { User } from './user.model';


@Injectable({
  providedIn: 'root',
})
export class UserDataSource extends DataSource<User> {
  protected override procedure = 'esms_m.r_license_user';
  protected override columns = datasourceColumns(
 'user_id', 
 'server', 
 'lic',
'lic_name',
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
'access',
'access_date',
'access_time',
'denial',
'denial_date',
'denial_time'
  );
  protected override procedureParams = ['user_id'];

  override load(request: DataSourceRequest): Observable<DataSourceResponse<User>> {
    const filters: FilterState = {
      user_id: 'webtest123',
      range: 'YTD',
      option: 'All',
      ...request.filters,
    };
    return super.load({ ...request, filters });
  }
}
