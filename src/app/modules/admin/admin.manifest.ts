import { defineModule, ModuleRegistration } from '../../core/registry/define-module';
const sidebar_title = 'ADMIN'
export const adminManifest: ModuleRegistration = defineModule({
  id: 'admin',
  title: 'Admin',
  description: 'This is an admin section',
  icon: 'bi bi-gear',
  order: 12,
  screens: [
    {
      title: 'Access Control',
      icon: 'bi bi-shield-lock',
      sidebar_title,
    },
    {
      title: 'Agent',
      icon: 'bi bi-pc-display',
      sidebar_title,
    },
    {
      title: 'Agent Install',
      icon: 'bi bi-download',
      sidebar_title,
    },
    {
      title: 'Cloud',
      icon: 'bi bi-cloud',
      sidebar_title,
    },
    {
      title: 'Data Process',
      icon: 'bi bi-cpu',
      sidebar_title,
    },
    {
      title: 'Department Summary 1',
      icon: 'bi bi-building',
      sidebar_title,
    },
    {
      title: 'ESEC Preferences',
      icon: 'bi bi-sliders',
      sidebar_title,
    },
    {
      title: 'GDPR',
      icon: 'bi bi-shield-check',
      sidebar_title,
    },
    {
      title: 'Holiday',
      icon: 'bi bi-calendar-event',
      sidebar_title,
    },
    {
      title: 'License',
      icon: 'bi bi-key',
      sidebar_title,
    },
    {
      title: 'License Cost',
      icon: 'bi bi-cash-stack',
      sidebar_title,
    },
    {
      title: 'Multi Site',
      icon: 'bi bi-diagram-3',
      sidebar_title,
    },
    {
      title: 'Software',
      icon: 'bi bi-grid',
      sidebar_title,
    },
    {
      title: 'Software Compliance',
      icon: 'bi bi-patch-check',
      sidebar_title,
    },
    {
      title: 'Software Inventory',
      icon: 'bi bi-box-seam',
      sidebar_title,
    },
    {
      title: 'Software Register',
      icon: 'bi bi-journal-code',
      sidebar_title,
    },
    {
      title: 'Software Register 1',
      icon: 'bi bi-journal-text',
      sidebar_title,
    },
    {
      title: 'Teamcenter',
      icon: 'bi bi-diagram-2',
      sidebar_title,
    },
    {
      title: 'User',
      icon: 'bi bi-person',
      sidebar_title,
    }
  ]
});