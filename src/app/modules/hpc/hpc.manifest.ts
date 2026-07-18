import { defineModule, ModuleRegistration } from '../../core/registry/define-module';
const sidebar_title = 'HPC'
export const hpcManifest: ModuleRegistration = defineModule({
  id: 'hpc',
  title: 'HPC',
  description: 'This is an HPC section',
  icon: 'bi bi-hdd-rack',
  order: 7,
  screens: [
    {
      title: 'CPU Status',
      icon: 'bi bi-cpu',
      sidebar_title,
    },
    {
      title: 'Job List',
      icon: 'bi bi-list-task',
      sidebar_title,
    },
    {
      title: 'Current Status',
      icon: 'bi bi-activity',
      sidebar_title,
    },
    {
      title: 'Server Usage',
      icon: 'bi bi-server',
      sidebar_title,
    }
  ]
});