import { GridContext } from '../../../../framework/grid';
import { OrganizationByWeekDataSource } from './organization-by-week.ds';
import { OrganizationByWeek } from './organization-by-week.model';
import { organizationByWeekFilterConfig } from './organization-by-week.filters';
import { organizationWeekColumns } from '../organization-week-grid';

export const OrganizationByWeekContext: GridContext<OrganizationByWeek> = {
  tabId: 'license.organization-by-week',
  title: 'Organization By Week',
  datasource: OrganizationByWeekDataSource,
  columns: organizationWeekColumns([], {}),
  columnsFactory: organizationWeekColumns,
  filterConfig: organizationByWeekFilterConfig,
};
