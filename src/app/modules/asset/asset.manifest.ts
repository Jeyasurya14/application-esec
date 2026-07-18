import { defineModule, ModuleRegistration } from '../../core/registry/define-module';
const sidebar_title = 'AST'
export const assetManifest: ModuleRegistration = defineModule({
  id: 'asset',
  title: 'Asset',
  description: 'This is an asset section',
  icon: 'bi bi-pc-display',
  order: 5,
  screens: [
    {
      title: 'Computer',
      icon: 'bi bi-pc-display',
      sidebar_title,
    },
    {
      title: 'File',
      icon: 'bi bi-file-earmark',
      sidebar_title,
    },
    {
      title: 'Services',
      icon: 'bi bi-gear',
      sidebar_title,
    },
    {
      title: 'Shortcut Menu',
      icon: 'bi bi-menu-button',
      sidebar_title,
    },
    {
      title: 'Print',
      icon: 'bi bi-printer',
      sidebar_title,
    }
  ]
});