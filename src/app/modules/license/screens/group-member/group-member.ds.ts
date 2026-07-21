import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '../../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../../framework/datasource/models';
import { FilterState } from '../../../../framework/filters';
import { datasourceColumns } from '../../../../framework/columns';
import { GroupMember } from './group-member.model';

@Injectable({
  providedIn: 'root',
})
export class GroupMemberDataSource extends DataSource<GroupMember> {
  protected override procedure = 'esms_m.r_license_group_member';
  protected override columns = datasourceColumns(
      'sw',
    'server',
    'location',
    'lic',
    'lic_name',
    'g_type',
    'g_name',
    'g_member',
    'start_date',
    's_time',
    'u_flag',
    'user_id',
    'wksn',
    'last_date',
    'u_time',
  );
  protected override procedureParams = [];

  override load(request: DataSourceRequest): Observable<DataSourceResponse<GroupMember>> {
    const filters: FilterState = {
      user_id: 'webtest123',
      range: 'YTD',
      option: 'All',
      ...request.filters,
    };
    return super.load({ ...request, filters });
  }
}
