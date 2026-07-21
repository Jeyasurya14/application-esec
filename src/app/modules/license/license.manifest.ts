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
      loadComponent: () =>
        import('./screens/department/department.component').then((m) => m.DepartmentComponent),
    },
    {
      title: 'Group',
      icon: 'bi bi-people',
      sidebar_title,
      loadComponent: () => import('./screens/group/group.component').then((m) => m.GroupComponent),
    },
    {
      title: 'My Feature',
      icon: 'bi bi-stars',
      sidebar_title,
      loadComponent: () =>
        import('./screens/my-feature/my-feature.component').then((m) => m.MyFeatureComponent),
    },
    {
      title: 'Report Type 1',
      icon: 'bi bi-file-earmark-bar-graph',
      sidebar_title,
      loadComponent: () =>
        import('./screens/report-type-1/report-type-1.component').then(
          (m) => m.ReportType1Component,
        ),
    },
    {
      title: 'Denial',
      icon: 'bi bi-x-circle',
      sidebar_title,
      loadComponent: () =>
        import('./screens/denial/denial.component').then((m) => m.DenialComponent),
    },
    {
      title: 'Borrow',
      icon: 'bi bi-arrow-left-right',
      sidebar_title,
      loadComponent: () =>
        import('./screens/borrow/borrow.component').then((m) => m.BorrowComponent),
    },
    {
      title: 'Usage',
      icon: 'bi bi-graph-up',
      sidebar_title,
      loadComponent: () => import('./screens/usage/usage.component').then((m) => m.UsageComponent),
    },
    {
      title: 'User',
      icon: 'bi bi-person',
      sidebar_title,
      loadComponent: () => import('./screens/user/user.component').then((m) => m.UserComponent),
    },
    {
      title: 'Computer',
      icon: 'bi bi-pc-display',
      sidebar_title,
      loadComponent: () =>
        import('./screens/computer/computer.component').then((m) => m.ComputerComponent),
    },
    {
      title: 'Group Member',
      icon: 'bi bi-people-fill',
      sidebar_title,
      loadComponent: () =>
        import('./screens/group-member/group-member.component').then((m) => m.GroupMemberComponent),
    },
    {
      title: 'License and Agent Combined',
      icon: 'bi bi-shield-check',
      sidebar_title,
      loadComponent: () =>
        import('./screens/license-and-agent-combined/license-and-agent-combined.component').then(
          (m) => m.LicenseAndAgentCombinedComponent,
        ),
    },
    {
      title: 'Debug Data',
      icon: 'bi bi-bug',
      sidebar_title,
      loadComponent: () =>
        import('./screens/debug-data/debug-data.component').then((m) => m.DebugDataComponent),
    },
  ],
});
