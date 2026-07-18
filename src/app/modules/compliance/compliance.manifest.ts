import { defineModule, ModuleRegistration } from '../../core/registry/define-module';
const sidebar_title = 'CMP'
export const complianceManifest: ModuleRegistration = defineModule({
  id: 'compliance',
  title: 'Compliance',
  description: 'This is a compliance section',
  icon: 'bi bi-shield-check',
  order: 6,
  screens: [
    {
      title: 'Software Compliance',
      icon: 'bi bi-shield-check',
      sidebar_title
    },
    {
      title: 'Communication Port',
      icon: 'bi bi-diagram-2',
      sidebar_title
    }
  ]
});