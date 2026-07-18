import { FilterConfig } from '../../../../../framework/filters';

export const organizationByWeekFilterConfig: FilterConfig = {
  controls: [
    {
      id: 'range',
      type: 'date-range',
      label: 'Date Range',
      width: 320,
    },
  ],
};
