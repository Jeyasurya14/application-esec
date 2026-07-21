import { buildQuarterOptions, buildYearOptions } from '../../../../core/services/period-preset.util';
import { FilterConfig } from '../../../../framework/filters';

export const groupFilterConfig: FilterConfig = {
  controls: [
    {
      id: 'search',
      type: 'search',
      placeholder: 'Search agents, users, servers...',
      width: 240,
      param: 'search',
      filter: {
        type: 'contains',
        field: 'sw',
        fields: ['sw', 'server', 'location', 'lic', 'lic_name', 'divn'],
      },
    },
    {
      id: 'status',
      type: 'chip',
      label: 'Status',
      width: 300,
      param: 'status',
      filter: {
        type: 'equals',
        field: 'status',
      },
      options: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Warning', value: 'warning' },
      ],
    },
    {
      id: 'range',
      type: 'period-range',
      label: 'Range',
      width: 180,
      param: 'range',
      filter: { type: 'periodRange', field: 'start_date' },
      options: [
        { label: 'YTD', value: 'ytd' },
        { label: '360 Days', value: '360' },
        { label: '180 Days', value: '180' },
        { label: '90 Days', value: '90' },
        { label: '60 Days', value: '60' },
        { label: '30 Days', value: '30' },
        { label: '7 Days', value: '7' },
        { label: 'Month-Year...', value: 'month-year' },
        ...buildQuarterOptions(),
        ...buildYearOptions(),
      ],
    },
    {
      id: 'option',
      type: 'grouped-select',
      label: 'Option',
      width: 180,
      param: 'option',
      filter: {
        type: 'optionMatch',
        field: '',
        valueFieldMap: {
          dp: 'p_dp',
          dpm: 'p_dpm',
          da: 'p_da',
          dam: 'p_dam',
          wp: 'p_wp',
          wpm: 'p_wpm',
          wa: 'p_wa',
          wam: 'p_wam',
        },
      },
      groups: [
        {
          label: 'Day',
          options: [
            { label: 'Peak (DP)', value: 'dp' },
            { label: 'Peak Mean (DPM)', value: 'dpm' },
            { label: 'Avg (DA)', value: 'da' },
            { label: 'Avg Mean (ADM)', value: 'adm' },
          ],
        },
        {
          label: 'Work',
          options: [
            { label: 'Peak (WP)', value: 'wp' },
            { label: 'Peak Mean (WPM)', value: 'wpm' },
            { label: 'Avg (WA)', value: 'wa' },
            { label: 'Avg Mean (WAM)', value: 'wam' },
          ],
        },
      ],
    },
    {
      id: 'compliance',
      type: 'checkbox-group',
      label: 'Compliance',
      width: 340,
      param: 'compliance',
      options: [
        { label: '<60%', value: 'under60' },
        { label: '>=60% to <80%', value: '60to80' },
        { label: '>=80%', value: 'over80' },
      ],
    },
    {
      id: 'feature',
      type: 'autocomplete',
      label: 'Feature',
      placeholder: 'Type feature name...',
      width: 200,
      param: 'feature',
      options: [
        { label: 'All Features', value: 'all' },
        { label: 'Primary Feature', value: 'primary' },
      ],
    },
  ],
};
