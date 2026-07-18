import { GridContext } from '../../../../../framework/grid';
import { gridColumns } from '../../../../../framework/columns';
import { Organization } from '../models/organization.model';
import { OrganizationDataSource } from '../datasource/organization.datasource';
import { organizationFilterConfig } from './organization.filters';

export const organizationContext: GridContext<Organization> = {
  tabId: 'license.organization',
  title: 'Organization',
  datasource: OrganizationDataSource,
  columns: gridColumns(
    'sw',
    'server',
    'location',
    'lic',
    'lic_name',
    'max_qty_i',
    'ndept',
    'ndivn',
    'status',
    'start_date',
    'tot_du_q',
    'p_dp',
    'p_dpm',
    'p_da',
    'p_dam',
    'p_wp',
    'p_wpm',
    'p_wa',
    'p_wam',
    'qty_dp',
    'qty_wp',
    'qty_r',
    'td',
    'tlh_24',
    'w_days',
    'w_dp_days',
  ),
  filterConfig: organizationFilterConfig,
};
