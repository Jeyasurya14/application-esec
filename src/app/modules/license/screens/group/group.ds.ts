import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '../../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../../framework/datasource/models';
import { FilterState } from '../../../../framework/filters';
import { datasourceColumns } from '../../../../framework/columns';
import { Group } from './group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupDataSource extends DataSource<Group> {
  protected override procedure = 'esms_m.r_group_grid';
  protected override columns = datasourceColumns(
    'sw',
    'server',
    'location',
    'lic',
    'lic_name',
    'divn',
    'l_qty_i',
    'max_qty_i',
    'qty_db',
    'qty_dp',
    'qty_da',
    'qty_dpm',
    'qty_dam',
    'qty_wp',
    'qty_wa',
    'qty_wpm',
    'qty_wam',
    'p_dp',
    'p_da',
    'p_dpm',
    'p_dam',
    'p_wp',
    'p_wpm',
    'p_wam',
    'p_wa',
    'w_days',
    'days',
    'di',
    'ndept',
    'de',
    'ad',
    'td',
    'tot_du_q',
    'expiry',
    'start_date',
    'last_date',
    'status',
    'bundle',
  );
  protected override procedureParams = ['user_id', 'range', 'option'];

  override load(request: DataSourceRequest): Observable<DataSourceResponse<Group>> {
    const filters: FilterState = {
      user_id: 'webtest123',
      range: 'YTD',
      option: 'All',
      ...request.filters,
    };
    return super.load({ ...request, filters });
  }
}
