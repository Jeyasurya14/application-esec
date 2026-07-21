import { GridContext } from '../../../../framework/grid';
import { gridColumns } from '../../../../framework/columns';
import { GroupMemberDataSource } from './group-member.ds';
import { GroupMember } from './group-member.model';
import { groupMemberFilterConfig } from './group-member.filters';


export const groupMemberContext: GridContext<GroupMember> = {
  tabId: 'license.group-member',
  title: 'Group Member',
  datasource: GroupMemberDataSource,
  columns: gridColumns(
    'sw',
    'server',
    'location',
    'lic',
    'lic_name',
    'g_type',
    'g_name',
    'g_member',
    'start_date',
    's_time',
    'u_flag',
    'user_id',
    'wksn',
    'last_date',
    'u_time',
  ),
  filterConfig: groupMemberFilterConfig,
};
