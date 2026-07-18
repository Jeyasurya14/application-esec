import { FilterConfig } from '../../../../../framework/filters';

function buildYearOptions(): { label: string; value: string }[] {
  const years: { label: string; value: string }[] = [];
  for (let y = 2020; y <= 2026; y++) {
    years.push({ label: `${y}`, value: `${y}` });
  }
  return years;
}

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function buildMonthOptions(): { label: string; value: string }[] {
  return MONTH_LABELS.map((label, i) => ({ label, value: `${i + 1}` }));
}

export const organizationByYearMonthFilterConfig: FilterConfig = {
  controls: [
    {
      id: 'years',
      type: 'multi-select',
      label: 'Years',
      width: 320,
      options: buildYearOptions(),
    },
    {
      id: 'months',
      type: 'multi-select',
      label: 'Months',
      width: 320,
      options: buildMonthOptions(),
    },
  ],
};
