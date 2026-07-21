import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '../../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../../framework/datasource/models';
import { FilterState } from '../../../../framework/filters';
import { datasourceColumns } from '../../../../framework/columns';
import { DebugData } from './debug-data.model';

@Injectable({
  providedIn: 'root',
})
export class DebugDataDataSource extends DataSource<DebugData> {
  protected override procedure = 'esms_m.r_license_debug_data';
  protected override columns = datasourceColumns(
        'sw_name',
        'location',
        'server',
        'lic',
  );
  protected override procedureParams = [];

  override load(request: DataSourceRequest): Observable<DataSourceResponse<DebugData>> {
    const filters: FilterState = {
      user_id: 'webtest123',
      range: 'YTD',
      option: 'All',
      ...request.filters,
    };
    return super.load({ ...request, filters });
  }
}
