import { defineModule, ModuleRegistration } from '../../core/registry/define-module';
const sidebar_title = 'DASH';
export const dashboardManifest: ModuleRegistration = defineModule({
  id: 'dashboard',
  title: 'Dashboard',
  description: 'Dashboard description',
  icon: 'bi-speedometer2',
  order: 1,
  screens: [
    {
      title: 'Agent (Linux)',
      icon: 'bi bi-server',
      sidebar_title,
      loadComponent: () =>
        import('./screens/agent-linux/agent-linux.component').then((m) => m.AgentLinuxComponent),
    },

    {
      title: 'Agent (Windows)',
      icon: 'bi bi-windows',
      sidebar_title,
      loadComponent: () =>
        import('./screens/agent-windows/agent-windows.component').then(
          (m) => m.AgentWindowComponent,
        ),
    },

    {
      title: 'Configuration',
      icon: 'bi bi-gear-fill',
      sidebar_title,
    },

    {
      title: 'Consolidated Software Summary',
      icon: 'bi bi-bar-chart-line-fill',
      sidebar_title,
    },

    {
      title: 'Department',
      icon: 'bi bi-building-fill',
      sidebar_title,
    },

    {
      title: 'Department Summary 1',
      icon: 'bi bi-building-check',
      sidebar_title,
    },

    {
      title: 'Division',
      icon: 'bi bi-diagram-3-fill',
      sidebar_title,
    },

    {
      title: 'On Cloud',
      icon: 'bi bi-cloud-fill',
      sidebar_title,
    },

    {
      title: 'On Prem',
      icon: 'bi bi-hdd-network-fill',
      sidebar_title,
    },

    {
      title: 'Process',
      icon: 'bi bi-cpu-fill',
      sidebar_title,
    },

    {
      title: 'Process Type 1',
      icon: 'bi bi-diagram-2-fill',
      sidebar_title,
    },

    {
      title: 'Process Type 2',
      icon: 'bi bi-diagram-2-fill',
      sidebar_title,
    },

    {
      title: 'Process Type 3',
      icon: 'bi bi-bezier2',
      sidebar_title,
    },

    {
      title: 'Software Inventory',
      icon: 'bi bi-box-seam-fill',
      sidebar_title,
    },

    {
      title: 'Software Summary',
      icon: 'bi bi-file-earmark-bar-graph-fill',
      sidebar_title,
    },

    {
      title: 'Software Summary 1',
      icon: 'bi bi-file-earmark-text-fill',
      sidebar_title,
    },

    {
      title: 'Vendor-Expiry-Utilization',
      icon: 'bi bi-calendar2-check-fill',
      sidebar_title,
    },
  ],
});
