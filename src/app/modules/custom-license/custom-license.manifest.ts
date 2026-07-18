import { defineModule, ModuleRegistration } from '../../core/registry/define-module';
const sidebar_title ='CUS-LI'
export const customLicenseManifest: ModuleRegistration = defineModule({
  id: 'custom-license',
  title: 'Custom License',
  description: 'This is a custom license section',
  icon: 'bi bi-award',
  order: 15,
  screens: [
    {
      title: 'Division Hours Used',
      icon: 'bi bi-clock-history',
      sidebar_title
    },
    {
      title: 'Division License Hours Used',
      icon: 'bi bi-hourglass-split',
      sidebar_title
    },
    {
      title: 'Division Teamcenter Hours Used',
      icon: 'bi bi-diagram-2',
      sidebar_title
    },
    {
      title: 'Department Hours Used',
      icon: 'bi bi-building',
      sidebar_title
    },
    {
      title: 'Department License Hours Used',
      icon: 'bi bi-building-check',
      sidebar_title
    },
    {
      title: 'Department Teamcenter Hours Used',
      icon: 'bi bi-diagram-2-fill',
      sidebar_title
    },
    {
      title: 'Software',
      icon: 'bi bi-grid',
      sidebar_title
    }
  ]
});