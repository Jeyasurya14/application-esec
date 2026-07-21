import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '../../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../../framework/datasource/models';
import { FilterState } from '../../../../framework/filters';
import { datasourceColumns } from '../../../../framework/columns';
import { Denial } from './denial.model';

@Injectable({
  providedIn: 'root',
})
export class DenialDataSource extends DataSource<Denial> {
  protected override procedure = 'esms_m.r_denial_grid';
  protected override columns = datasourceColumns(
        'sw',
        'server',
        'location',
        'lic',
        'lic_name',
        'l_qty_i',
        'di',
        'ad',
        'td',
        'dd',
        'expiry',
        'start_date',
        'last_date',
        'status',
        'bundle',
  );
  protected override procedureParams = ['user_id','range','option'];

  override load(request: DataSourceRequest): Observable<DataSourceResponse<Denial>> {
    const filters: FilterState = {
      user_id: 'webtest123',
      range:'360',
      option:'TEST_FEATURES',
      ...request.filters,
    };
    return super.load({ ...request, filters });
  }
}
