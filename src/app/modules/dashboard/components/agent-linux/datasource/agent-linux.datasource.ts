import { DataSource } from '../../../../../framework/datasource/datasource';
import { datasourceColumns } from '../../../../../framework/columns';
import { AgentLinux } from '../models/agent-linux.model';
import { FilterDefinition } from '../../../../../framework/filters';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgentLinuxDataSource extends DataSource<AgentLinux> {
  protected override procedure = 'esms_n.r_lx_cc_computer';
  protected override columns = datasourceColumns(
    'wksn',
    'ip',
    'macid',
    'ncore',
    'nproc',
    'os',
    'ram',
    'serialno',
    'u_time',
  );
  protected override readonly filterDefinitions: readonly FilterDefinition[] = [
    {
      id: 'search',
      type: 'contains',
      field: 'wksn',
      fields: ['wksn', 'agent_version', 'client_version'],
    },
    {
      id: 'status',
      type: 'equals',
      field: 'agent_status',
    },
  ];
}
