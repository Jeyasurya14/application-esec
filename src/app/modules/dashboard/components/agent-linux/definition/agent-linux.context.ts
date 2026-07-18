import { GridContext } from '../../../../../framework/grid';
import { gridColumns } from '../../../../../framework/columns';
import { AgentLinux } from '../models/agent-linux.model';
import { AgentLinuxDataSource } from '../datasource/agent-linux.datasource';
import { agentLinuxFilterConfig } from './agent-linux.filters';

export const agentLinuxContext: GridContext<AgentLinux> = {
  tabId: 'dashboard.agent-linux',
  title: 'Agent Linux',
  datasource: AgentLinuxDataSource,
  columns: gridColumns('wksn', 'ip', 'macid', 'ncore', 'nproc', 'os', 'ram', 'serialno', 'u_time'),
  filterConfig: agentLinuxFilterConfig,
};
