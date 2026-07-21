import { GridContext } from '../../../../framework/grid';
import { gridColumns } from '../../../../framework/columns';
import { GroupDataSource } from './group.ds';
import { Group } from './group.model';
import { groupFilterConfig } from './group.filters';


export const groupContext: GridContext<Group> = {
  tabId: 'license.group',
  title: 'Group',
  datasource: GroupDataSource,
  columns: gridColumns(
    'sw',
    'server',
    'location',
    'lic',
    'lic_name',
    'divn',
    'l_qty_i',
    'max_qty_i',
    'qty_db',
    'qty_dp',
    'qty_da',
    'qty_dpm',
    'qty_dam',
    'qty_wp',
    'qty_wa',
    'qty_wpm',
    'qty_wam',
    'p_dp',
    'p_da',
    'p_dpm',
    'p_dam',
    'p_wp',
    'p_wpm',
    'p_wam',
    'p_wa',
    'w_days',
    'days',
    'di',
    'ndept',
    'de',
    'ad',
    'td',
    'tot_du_q',
    'expiry',
    'start_date',
    'last_date',
    'status',
    'bundle',
  ),
  filterConfig: groupFilterConfig,
};
