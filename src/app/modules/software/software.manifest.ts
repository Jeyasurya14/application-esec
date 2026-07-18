import { defineModule, ModuleRegistration } from '../../core/registry/define-module';

const sidebar_title = 'SW'
export const softwareManifest: ModuleRegistration = defineModule({
  id: 'software',
  title: 'Software',
  description: 'This is a software section',
  icon: 'bi bi-grid-fill',
  order: 14,
  screens: [
    {
      title: 'Actcad',
      icon: 'bi bi-grid',
      sidebar_title
    },
    {
      title: 'Cosin',
      icon: 'bi bi-grid',
      sidebar_title
    },
    {
      title: 'Multi',
      icon: 'bi bi-grid-3x3-gap',
      sidebar_title
    },
    {
      title: 'Pup',
      icon: 'bi bi-box',
      sidebar_title
    },
    {
      title: 'VCS',
      icon: 'bi bi-git',
      sidebar_title
    },
    {
      title: 'Windchill',
      icon: 'bi bi-wind',
      sidebar_title
    },
    {
      title: 'XCrash',
      icon: 'bi bi-bug',
      sidebar_title
    }
  ]
});