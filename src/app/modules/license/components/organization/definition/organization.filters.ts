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

export const organizationFilterConfig: FilterConfig = {
  controls: [
    {
      id: 'range',
      type: 'period-range',
      label: 'Range',
      width: 180,
      param: 'range',
      options: [
        { label: 'YTD', value: 'YTD' },
        { label: '360 Days', value: '360Days' },
        { label: '180 Days', value: '180Days' },
        { label: '90 Days', value: '90Days' },
        { label: '60 Days', value: '60Days' },
        { label: '30 Days', value: '30Days' },
        { label: '7 Days', value: '7Days' },
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
