import { gridColumns } from '../../../../framework/columns';
import { GridContext } from '../../../../framework/grid';
import { ComputerDataSource } from './computer.ds';
import { computerFilterConfig } from './computer.filters';
import { Computer } from './computer.model';

export const computerContext: GridContext<Computer> = {
  tabId: 'license.borrow',
  title: 'Borrow',
  datasource: ComputerDataSource,
  columns: gridColumns(
         'wksn',
        'server',
        'lic',
        'lic_name',
        'access',
        'access_date',
        'access_time',
        'denial',
        'denial_date',
        'denial_time',
  ),
  filterConfig: computerFilterConfig,
};
