import { buildQuarterOptions, buildYearOptions } from '../../../../core/services/period-preset.util';
import { FilterConfig } from '../../../../framework/filters';

export const denialFilterConfig: FilterConfig = {
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
      id: 'feature',
      type: 'autocomplete',
      label: 'Feature',
      placeholder: 'Type feature name...',
      width: 200,
      param: 'feature',
      options: [
        { label: 'All Features', value: 'All' },
        { label: 'Primary Feature', value: 'primary' },
        { label: 'Test Feature', value: 'TEST_FEATURES' },
      ],
    },
  ],
};
