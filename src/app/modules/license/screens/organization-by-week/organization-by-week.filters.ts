import { FilterConfig } from '../../../../framework/filters';
import {
  ORGANIZATION_WEEK_DEFAULT_OPTIONS,
  ORGANIZATION_WEEK_FILTER_ID,
} from '../organization-week-grid';

export const organizationByWeekFilterConfig: FilterConfig = {
  controls: [
    {
      id: 'range',
      type: 'date-range',
      label: 'Date Range',
      width: 320,
    },
    {
      id: ORGANIZATION_WEEK_FILTER_ID,
      type: 'checkbox-group',
      value: ORGANIZATION_WEEK_DEFAULT_OPTIONS,
      width: 1020,
      options: [
        { label: 'Working Days', value: 'working_days' },
        { label: 'Primary', value: 'primary' },
        { label: 'I-Issued', value: 'issued' },
        { label: 'DP-Day Peak', value: 'dp' },
        { label: 'DP (%)-Day Peak (%)', value: 'dp_percent' },
        { label: 'DI- Distinct User', value: 'di' },
        { label: 'UH- Used License Hours', value: 'uh' },
        { label: 'AH- Available License Hours', value: 'ah' },
        { label: 'UH (%)- Used Hours (%)', value: 'uh_percent' },
      ],
    },
  ],
};
