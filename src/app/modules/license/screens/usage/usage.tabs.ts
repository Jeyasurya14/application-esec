import { SubTabDefinition } from '../../../../shared/sub-tab-host';

export const UsageSubTabs: readonly SubTabDefinition[] = [
  {
    id: 'computer',
    label: 'Summary',
    procedure: 'esms_n.r_lx_cc_computer',
    columns: ['wksn', 'ip', 'macid', 'ncore', 'nproc', 'os', 'ram', 'serialno', 'u_time'],
    searchFields: ['wksn', 'ip', 'os'],
  },
  {
    id: 'env',
    label: 'Matrix Sw Svr Ftr',
    procedure: 'esms_n.r_lx_cc_computer_env_list',
    columns: ['env', 'w_count'] as const,
    searchFields: ['env', 'w_count'] as const,
     children: [
      {
        id: 'child-tab-1',
        label: 'Division',
        procedure: 'esms_n.r_lx_cc_computer_env_list',
        columns: ['env', 'w_count'] as const,
      },
      {
        id:'child-tab-2',
        label:'Department',
        procedure:'esms_n.r',
        columns:[]
      },
      {
        id:'child-tab-3',
        label:'Group',
        procedure:'esms_n.r',
        columns:[]
      }
    ] as const,
  },
  {
    id: 'software',
    label: 'Matrix Sw Svr',
    procedure: 'esms_n.r_lx_cc_computer_sw_list',
    columns: ['sw_name', 'pub', 'ver', 'w_count'],
    searchFields: ['wksn', 'sw', 'lic', 'version'],
     children: [
      {
        id: 'child-tab-1',
        label: 'Division',
        procedure: 'esms_n.r_lx_cc_computer_env_list',
        columns: ['env', 'w_count'] as const,
      },
      {
        id:'child-tab-2',
        label:'Department',
        procedure:'esms_n.r',
        columns:[]
      },
      {
        id:'child-tab-3',
        label:'Group',
        procedure:'esms_n.r',
        columns:[]
      }
    ] as const,
  },
  {
    id: 'disk',
    label: 'Matrix Sw',
    procedure: 'esms_n.r_lx_cc_computer_du_usage',
    columns: ['wksn', 'ip', 'macid', 'serialno','ram','filesystem','Size','mounted_on','available','used','usedpercentage'],
    searchFields: ['wksn', 'server', 'os'],
     children: [
      {
        id: 'child-tab-1',
        label: 'Division',
        procedure: 'esms_n.r_lx_cc_computer_env_list',
        columns: ['env', 'w_count'] as const,
      },
      {
        id:'child-tab-2',
        label:'Department',
        procedure:'esms_n.r',
        columns:[]
      },
      {
        id:'child-tab-3',
        label:'Group',
        procedure:'esms_n.r',
        columns:[]
      }
    ] as const,
  },
];
