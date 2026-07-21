import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '../../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../../framework/datasource/models';
import { FilterState } from '../../../../framework/filters';
import { datasourceColumns } from '../../../../framework/columns';
import { Department } from './department.models';

@Injectable({
  providedIn: 'root',
})
export class DepartmentDataSource extends DataSource<Department> {
  protected override procedure = 'esms_m.r_department_grid';
  protected override columns = datasourceColumns(
    'sw',
    'server',
    'location',
    'lic',
    'lic_name',
    'divn',
    'dept',
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
    'p_wa',
    'p_wpm',
    'p_wam',
    'w_days',
    'days',
    'di',
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

  override load(request: DataSourceRequest): Observable<DataSourceResponse<Department>> {
    const filters: FilterState = {
      user_id: 'webtest123',
      range: 'YTD',
      option: 'All',
      ...request.filters,
    };
    return super.load({ ...request, filters });
  }
}
