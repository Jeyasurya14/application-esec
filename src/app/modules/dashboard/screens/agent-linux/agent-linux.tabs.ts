import { SubTabDefinition } from '../../../../shared/sub-tab-host';

export const agentLinuxSubTabs: readonly SubTabDefinition[] = [
  {
    id: 'computer',
    label: 'Computer',
    procedure: 'esms_n.r_lx_cc_computer',
    columns: ['wksn', 'ip', 'macid', 'ncore', 'nproc', 'os', 'ram', 'serialno', 'u_time'],
    searchFields: ['wksn', 'ip', 'os'],
  },
  {
    id: 'env',
    label: 'Environment',
    procedure: 'esms_n.r_lx_cc_computer_env_list',
    columns: ['env', 'w_count'],
    searchFields: ['wksn', 'server', 'os'],
  },
  {
    id: 'software',
    label: 'Software',
    procedure: 'esms_n.r_lx_cc_computer_sw_list',
    columns: ['sw_name', 'pub', 'ver', 'w_count'],
    searchFields: ['wksn', 'sw', 'lic', 'version'],
  },
  {
    id: 'disk',
    label: 'Disk',
    procedure: 'esms_n.r_lx_cc_computer_du_usage',
    columns: ['wksn', 'ip', 'macid', 'serialno','ram','filesystem','Size','mounted_on','available','used','usedpercentage'],
    searchFields: ['wksn', 'server', 'os'],
  },
  {
    id: 'drive',
    label: 'Drive',
    procedure: 'esms_n.r_lx_cc_computer_dd_details',
    columns: ['wksn', 'ip', 'macid', 'serialno','ram','FriendlyName','DiskSerialNumber','Manufacturer','MediaType','HealthStatus','Size'],
    searchFields: ['wksn', 'FriendlyName', 'os'],
  },
  {
    id: 'user',
    label: 'User',
    procedure: 'esms_n.r_lx_cc_computer_user_list',
    columns: ['user_id', 'w_count'],
    searchFields: ['user_id', 'w_count'],
  },
];
