import { defineModule, ModuleRegistration } from '../../core/registry/define-module';
const sidebar_title = 'LIC';
export const licenseManifest: ModuleRegistration = defineModule({
  id: 'license',
  title: 'License',
  description: 'This is a license section',
  icon: 'bi-key',
  order: 5,
  screens: [
    {
      title: 'Organization',
      icon: 'bi bi-building',
      sidebar_title,
      loadComponent: () =>
        import('./screens/organization/organization.component').then(
          (m) => m.OrganizationComponent,
        ),
    },

    {
      title: 'Organization By Week',
      icon: 'bi bi-calendar-week',
      sidebar_title,
      loadComponent: () =>
        import('./screens/organization-by-week/organization-by-week.component').then(
          (m) => m.OrganizationByWeekComponent,
        ),
    },

    {
      title: 'Organization By Year Month',
      icon: 'bi bi-calendar3',
      sidebar_title,
      loadComponent: () =>
        import('./screens/organization-by-year-month/organization-by-year-month.component').then(
          (m) => m.OrganizationByYearMonthComponent,
        ),
    },

    {
      title: 'Division',
      icon: 'bi bi-diagram-3',
      sidebar_title,
      loadComponent: () =>
        import('./screens/division/division.component').then((m) => m.DivisionComponent),
    },

    {
      title: 'Department',
      icon: 'bi bi-building-fill',
      sidebar_title,
    },

    {
      title: 'Group',
      icon: 'bi bi-people',
      sidebar_title,
    },

    {
      title: 'My Feature',
      icon: 'bi bi-stars',
      sidebar_title,
    },

    {
      title: 'Report Type 1',
      icon: 'bi bi-file-earmark-bar-graph',
      sidebar_title,
    },

    {
      title: 'Denial',
      icon: 'bi bi-x-circle',
      sidebar_title,
    },

    {
      title: 'Borrow',
      icon: 'bi bi-arrow-left-right',
      sidebar_title,
    },

    {
      title: 'Usage',
      icon: 'bi bi-graph-up',
      sidebar_title,
    },

    {
      title: 'User',
      icon: 'bi bi-person',
      sidebar_title,
    },

    {
      title: 'Computer',
      icon: 'bi bi-pc-display',
      sidebar_title,
    },

    {
      title: 'Group Member',
      icon: 'bi bi-people-fill',
      sidebar_title,
    },

    {
      title: 'License and Agent Combined',
      icon: 'bi bi-shield-check',
      sidebar_title,
    },

    {
      title: 'Debug Data',
      icon: 'bi bi-bug',
      sidebar_title,
    },
  ],
});
