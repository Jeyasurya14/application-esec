import { FilterConfig } from '../../../../framework/filters';

export const groupMemberFilterConfig: FilterConfig = {
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
  ],
};
