import { gridColumns } from '../../../../framework/columns';
import { GridContext } from '../../../../framework/grid';
import { DenialDataSource } from './denial.ds';
import { denialFilterConfig } from './denial.filters';
import { Denial } from './denial.model';


export const denialContext: GridContext<Denial> = {
  tabId: 'license.denial',
  title: 'Denial',
  datasource: DenialDataSource,
  columns: gridColumns(
         'sw',
        'server',
        'location',
        'lic',
        'lic_name',
        'l_qty_i',
        'di',
        'ad',
        'td',
        'dd',
        'expiry',
        'start_date',
        'last_date',
        'status',
        'bundle',
  ),
  filterConfig: denialFilterConfig,
};
