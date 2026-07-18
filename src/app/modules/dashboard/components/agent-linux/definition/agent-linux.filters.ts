import { FilterConfig } from '../../../../../framework/filters';

const currentYear = new Date().getFullYear();
const currentQuarter = Math.floor(new Date().getMonth() / 3) + 1;

function buildQuarterOptions(): { label: string; value: string }[] {
  const options: { label: string; value: string }[] = [];
  let y = currentYear;
  let q = currentQuarter;
  for (let i = 0; i < 4; i++) {
    options.unshift({ label: `Q${q}-${y}`, value: `Q${q}-${y}` });
    q--;
    if (q === 0) {
      q = 4;
      y--;
    }
  }
  return options;
}

function buildYearOptions(): { label: string; value: string }[] {
  return [
    { label: `${currentYear - 1}`, value: `${currentYear - 1}` },
    { label: `${currentYear}`, value: `${currentYear}` },
  ];
}

export const agentLinuxFilterConfig: FilterConfig = {
  controls: [
    {
      id: 'search',
      type: 'search',
      placeholder: 'Search agents, users, servers...',
      width: 240,
      param: 'search',
    },
    {
      id: 'status',
      type: 'chip',
      label: 'Status',
      width: 300,
      param: 'status',
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
      options: [
        { label: 'YTD', value: 'ytd' },
        { label: '360 Days', value: '360Days' },
        { label: '180 Days', value: '180Days' },
        { label: '90 Days', value: '90Days' },
        { label: '60 Days', value: '60Days' },
        { label: '30 Days', value: '30Days' },
        { label: '7 Days', value: '7Days' },
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
