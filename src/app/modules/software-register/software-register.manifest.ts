import { defineModule, ModuleRegistration } from '../../core/registry/define-module';
const sidebar_title = 'SWR'
export const softwareRegisterManifest: ModuleRegistration = defineModule({
  id: 'software-register',
  title: 'Software Register',
  description: 'This is a software register section',
  icon: 'bi bi-check-circle',
  order: 9,
  screens: [
    {
      title: 'Software Register',
      icon: 'bi bi-journal-code',
      sidebar_title
    },
    {
      title: 'Software Utilization Month',
      icon: 'bi bi-calendar-month',
      sidebar_title
    },
    {
      title: 'Node Locked',
      icon: 'bi bi-lock',
      sidebar_title
    }
  ]
});