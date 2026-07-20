import { buildQuarterOptions, buildYearOptions } from '../../../../core/services/period-preset.util';
import { FilterConfig } from '../../../../framework/filters';

export const organizationFilterConfig: FilterConfig = {
  controls: [
    {
      id: 'range',
      type: 'period-range',
      label: 'Range',
      width: 180,
      param: 'range',
      filter: { type: 'periodRange', field: 'start_date' },
      options: [
        { label: 'YTD', value: 'YTD' },
        { label: '360 Days', value: '360' },
        { label: '180 Days', value: '180' },
        { label: '90 Days', value: '90' },
        { label: '60 Days', value: '60' },
        { label: '30 Days', value: '30' },
        { label: '7 Days', value: '7' },
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
          label: 'All',
          options: [{ label: 'All', value: 'All' }],
        },
        {
          label: 'Day',
          options: [
            { label: 'Peak (DP)', value: 'dp' },
            { label: 'Peak Mean (DPM)', value: 'dpm' },
            { label: 'Avg (DA)', value: 'da' },
            { label: 'Avg Mean (DAM)', value: 'dam' },
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
  ],
};
