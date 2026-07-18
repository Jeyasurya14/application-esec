import { GridContext } from '../../../../../framework/grid';
import { gridColumns } from '../../../../../framework/columns';
import { AgentWindowDataSource } from '../datasource';
import { AgentWindow } from '../models/agent-windows.model';
import { agentWindowFilterConfig } from './agent-window.filter';

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
