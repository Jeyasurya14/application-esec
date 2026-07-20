import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '../../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../../framework/datasource/models';
import { FilterState } from '../../../../framework/filters';
import { Organization } from './organization.model';
import { datasourceColumns } from '../../../../framework/columns';

@Injectable({
  providedIn: 'root',
})
export class OrganizationDataSource extends DataSource<Organization> {
  protected override procedure = 'esms_m.r_organization_grid';
  protected override columns = datasourceColumns(
    'sw',
    'server',
    'location',
    'lic',
    'lic_name',
    'max_qty_i',
    'ndept',
    'ndivn',
    'p_da',
    'p_dam',
    'p_dp',
    'p_dpm',
    'p_wa',
    'p_wam',
    'p_wp',
    'p_wpm',
    'qty_da',
    'qty_dam',
    'qty_db',
    'qty_dp',
    'qty_dpm',
    'qty_r',
    'qty_wa',
    'qty_wam',
    'qty_wp',
    'qty_wpm',
    'start_date',
    'status',
    'td',
    'tlh_24',
    'tot_du_q',
    'w_days',
    'w_dp_days',
  );
  protected override procedureParams = ['user_id', 'range', 'option'];

  override load(request: DataSourceRequest): Observable<DataSourceResponse<Organization>> {
    const filters: FilterState = {
      user_id: 'webtest123',
      range: 'YTD',
      option: 'All',
      ...request.filters,
    };
    return super.load({ ...request, filters });
  }
}
