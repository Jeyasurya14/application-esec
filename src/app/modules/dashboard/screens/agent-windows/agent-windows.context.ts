import { GridContext } from '../../../../framework/grid';
import { gridColumns } from '../../../../framework/columns';
import { AgentWindowDataSource } from './agent-windows.ds';
import { AgentWindow } from './agent-windows.model';
import { agentWindowFilterConfig } from './agent-windows.filters';

export const agentWindowsContext: GridContext<AgentWindow> = {
  tabId: 'dashboard.agent-window',
  title: 'Agent Window',
  datasource: AgentWindowDataSource,
  columns: gridColumns(
    'wksn',
    'grp',
    'ip',
    'macid',
    'serialno',
    'os',
    'ram',
    'ncore',
    'nproc',
    'date',
    'u_time',
  ),
  filterConfig: agentWindowFilterConfig,
};
