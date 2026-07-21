import { GridContext } from '../../../../framework/grid';
import { UserDataSource } from './user.ds';
import { User } from './user.model';
import { userFilterConfig } from './user.filters';
import { gridColumns } from '../../../../framework/columns';

export const userContext: GridContext<User> = {
  tabId: 'license.user',
  title: 'User',
  datasource: UserDataSource,
  columns: gridColumns(
 'user_id', 
 'server', 
 'lic',
'lic_name',
'user_name',
'region',
'country',
'divn',
'dept', 
'section',
'rpt_id',
'city',
'state',
'bldg',
'access',
'access_date',
'access_time',
'denial',
'denial_date',
'denial_time'
  ),
  filterConfig: userFilterConfig,
};
