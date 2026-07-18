import { Injectable } from '@angular/core';
import { DataSource } from '../../../../../framework/datasource/datasource';
import { datasourceColumns } from '../../../../../framework/columns';
import { AgentWindow } from '../models/agent-windows.model';

@Injectable({
  providedIn: 'root',
})
export class AgentWindowDataSource extends DataSource<AgentWindow> {
  protected override procedure = 'esms_n.r_asset_workstation_computer';
  protected override columns = datasourceColumns(
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
  );
}
