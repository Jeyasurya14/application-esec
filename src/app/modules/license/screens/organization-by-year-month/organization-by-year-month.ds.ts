import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '../../../../framework/datasource/datasource';
import { DataSourceRequest, DataSourceResponse } from '../../../../framework/datasource/models';
import { FilterState } from '../../../../framework/filters';
import { OrganizationByYearMonth } from './organization-by-year-month.model';
import { datasourceColumns } from '../../../../framework/columns';

@Injectable({
  providedIn: 'root',
})
export class OrganizationByYearMonthDataSource extends DataSource<OrganizationByYearMonth> {
  protected override columns = datasourceColumns(
    'month_year',
    'server',
    'lic',
    'status',
    'qty_i',
    'qty_dp',
    'qty_dpm',
    'qty_da',
    'qty_dam',
    'qty_wp',
    'qty_wpm',
    'qty_wa',
    'qty_wam',
  );

  private _procedure = 'esms_m.r_organization_year_month_1_server';
  private _procedureParams: readonly string[] = ['years_json', 'extra'];

  override getProcedure(): string | undefined {
    return this._procedure;
  }

  override getProcedureParams(): readonly string[] {
    return this._procedureParams;
  }

  override load(
    request: DataSourceRequest,
  ): Observable<DataSourceResponse<OrganizationByYearMonth>> {
    const years = request.filters['years'] as string[] | undefined;
    const months = request.filters['months'] as string[] | undefined;

    const hasYears = years !== undefined && years.length > 0;
    const hasMonths = months !== undefined && months.length > 0;

    if (hasYears && hasMonths) {
      const yearNums = years!.map(Number);
      const yearStart = String(Math.min(...yearNums));
      const yearEnd = String(Math.max(...yearNums));
      const monthStr = months!.join(',');

      this._procedure = 'esms_m.r_organization_year_month_3_server';
      this._procedureParams = ['year_start', 'year_end', 'month', 'extra'];

      return super.load({
        ...request,
        filters: { year_start: yearStart, year_end: yearEnd, month: monthStr, extra: '' },
      });
    }

    if (hasMonths) {
      const yearVals = hasYears ? years!.map(Number) : [new Date().getFullYear()];
      const monthVals = months!.map(Number);
      const combos = yearVals.flatMap((y) => monthVals.map((m) => ({ year: y, month: m })));

      this._procedure = 'esms_m.r_organization_year_month_2_server';
      this._procedureParams = ['years_months_json', 'extra'];

      return super.load({
        ...request,
        filters: { years_months_json: JSON.stringify(combos), extra: '' },
      });
    }

    this._procedure = 'esms_m.r_organization_year_month_1_server';
    this._procedureParams = ['years_json', 'extra'];

    const yearsJson = hasYears ? JSON.stringify(years!.map((y) => ({ year: y }))) : '';
    return super.load({
      ...request,
      filters: { years_json: yearsJson, extra: '' },
    });
  }
}
