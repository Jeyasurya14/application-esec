import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '../../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../../framework/datasource/models';
import { FilterState } from '../../../../framework/filters';
import { OrganizationByWeek } from './organization-by-week.model';
import { datasourceColumns } from '../../../../framework/columns';

@Injectable({
  providedIn: 'root',
})
export class OrganizationByWeekDataSource extends DataSource<OrganizationByWeek> {
  protected override procedure = 'esms_m.r_organization_week_report';
  protected override columns = datasourceColumns(
     'sw',
    'server',
    'location',
    'lic',
    'bundle',
    'date',
    'li_holi',
    'qty_i',
    'qty_dp',
    'p_dp',
    'di',
    'used_lic_hours',
    'avail_lic_hours',
    'p_dw_q',
  );
  protected override procedureParams = ['start_date', 'end_date', 'hours', 'extra'];

  override load(request: DataSourceRequest): Observable<DataSourceResponse<OrganizationByWeek>> {
    const range = request.filters['range'] as { start?: string; end?: string } | undefined;
    console.log(range)
    const filters: FilterState = {
      start_date: range?.start || '2021-01-31',
      end_date: range?.end || '2021-02-06',
      hours: '9.75',
      extra: '',
    };
    return super.load({ ...request, filters });
  }
}
