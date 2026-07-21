import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '../../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../../framework/datasource/models';
import { FilterState } from '../../../../framework/filters';
import { datasourceColumns } from '../../../../framework/columns';
import { ReportType1 } from './report-type-1.model';

@Injectable({
  providedIn: 'root',
})
export class ReportType1DataSource extends DataSource<ReportType1> {
  protected override procedure = 'esms_m.r_report_view_1_select_parameters';
  protected override columns = datasourceColumns(
    'sw',
    'server',
    'lic',
    'lic_name',
  );
  protected override procedureParams = [];

  override load(request: DataSourceRequest): Observable<DataSourceResponse<ReportType1>> {
    const filters: FilterState = {
      user_id: 'webtest123',
      range: 'YTD',
      option: 'All',
      ...request.filters,
    };
    return super.load({ ...request, filters });
  }
}
