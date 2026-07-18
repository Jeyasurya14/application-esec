import { GridContext } from '../../../../../framework/grid';
import { gridColumns } from '../../../../../framework/columns';
import { OrganizationByYearMonth } from '../models/organization-by-year-month.model';
import { OrganizationByYearMonthDataSource } from '../datasource/organization-by-year-month.datasource';
import { organizationByYearMonthFilterConfig } from './organization-by-year-month.filters';

export const organizationByYearMonthContext: GridContext<OrganizationByYearMonth> = {
  tabId: 'license.organization-by-year-month',
  title: 'Organization By Year Month',
  datasource: OrganizationByYearMonthDataSource,
  columns: gridColumns(
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
  ),
  filterConfig: organizationByYearMonthFilterConfig,
};
