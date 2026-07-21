import { gridColumns } from '../../../../framework/columns';
import { GridContext } from '../../../../framework/grid';
import { DebugDataDataSource } from './debug-data.ds';
import { debugDataFilterConfig } from './debug-data.filters';
import { DebugData } from './debug-data.model';

export const debugDataContext: GridContext<DebugData> = {
  tabId: 'license.debugdata',
  title: 'DebugData',
  datasource: DebugDataDataSource,
  columns: gridColumns(
        'sw_name',
        'location',
        'server',
        'lic',
  ),
  filterConfig: debugDataFilterConfig,
};
