import { defineModule, ModuleRegistration } from '../../core/registry/define-module';
const sidebar_title = 'MULT'
export const multiSiteManifest: ModuleRegistration = defineModule({
  id: 'multisite',
  title: 'Multi Site',
  description: 'This is a multi site section',
  icon: 'bi bi-diagram-3',
  order: 8,
  screens: [
    {
      title: 'Dashboard',
      icon: 'bi bi-speedometer2',
      sidebar_title
    },
    {
      title: 'License Organization',
      icon: 'bi bi-building',
      sidebar_title
    },
    {
      title: 'License Usage',
      icon: 'bi bi-graph-up',
      sidebar_title
    },
    {
      title: 'License Expiry',
      icon: 'bi bi-calendar-x',
      sidebar_title
    },
    {
      title: 'Agent Dashboard',
      icon: 'bi bi-display',
      sidebar_title
    },
    {
      title: 'Agent Process Type 1',
      icon: 'bi bi-cpu',
      sidebar_title
    },
    {
      title: 'Agent User',
      icon: 'bi bi-person',
      sidebar_title
    },
    {
      title: 'Agent User Process Computer',
      icon: 'bi bi-diagram-3',
      sidebar_title
    },
    {
      title: 'Agent License Harvest',
      icon: 'bi bi-shield-check',
      sidebar_title
    },
    {
      title: 'Status',
      icon: 'bi bi-check-circle',
      sidebar_title
    }
  ]
});