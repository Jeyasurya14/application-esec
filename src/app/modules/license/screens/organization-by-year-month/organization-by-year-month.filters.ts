import { buildMonthOptions, buildYearOptions } from '../../../../core/services/period-preset.util';
import { FilterConfig } from '../../../../framework/filters';

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
