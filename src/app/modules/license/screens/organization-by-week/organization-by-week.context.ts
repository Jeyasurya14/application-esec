import { GridContext } from '../../../../framework/grid';
import { gridColumns } from '../../../../framework/columns';
import { OrganizationByWeekDataSource } from './organization-by-week.ds';
import { OrganizationByWeek } from './organization-by-week.model';
import { organizationByWeekFilterConfig } from './organization-by-week.filters';

export const OrganizationByWeekContext: GridContext<OrganizationByWeek> = {
  tabId: 'license.organization-by-week',
  title: 'Organization By Week',
  datasource: OrganizationByWeekDataSource,
  columns: gridColumns(
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
  ),
  filterConfig: organizationByWeekFilterConfig,
};
