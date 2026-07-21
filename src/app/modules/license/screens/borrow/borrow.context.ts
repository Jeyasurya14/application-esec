import { gridColumns } from '../../../../framework/columns';
import { GridContext } from '../../../../framework/grid';
import { BorrowDataSource } from './borrow.ds';
import { borrowFilterConfig } from './borrow.filters';
import { Borrow } from './borrow.model';

export const borrowContext: GridContext<Borrow> = {
  tabId: 'license.borrow',
  title: 'Borrow',
  datasource: BorrowDataSource,
  columns: gridColumns(
    'sw',
    'server',
    'location',
    'lic',
    'lic_name',
    'user_id',
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
    'count',
    'status',
    'bundle',
  ),
  filterConfig: borrowFilterConfig,
};
