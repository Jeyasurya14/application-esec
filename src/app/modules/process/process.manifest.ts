import { defineModule, ModuleRegistration } from "../../core/registry/define-module";


const sidebar_title = 'PRC'
export const ProcessManifest : ModuleRegistration = defineModule({
    id:'process',
    title:'Process',
    description:'Process description',
    icon:'bi-cpu',
    order:7,
    screens:[
  {
    title: 'User Process Computer',
    icon: 'bi bi-diagram-3',
    sidebar_title
  },

  {
    title: 'User Process',
    icon: 'bi bi-person-gear',
    sidebar_title
  },

  {
    title: 'User Computer',
    icon: 'bi bi-person-workspace',
    sidebar_title
  },

  {
    title: 'User',
    icon: 'bi bi-person',
    sidebar_title
  },

  {
    title: 'Computer Process',
    icon: 'bi bi-pc-display',
    sidebar_title
  },

  {
    title: 'Exe Usage',
    icon: 'bi bi-file-earmark-binary',
    sidebar_title
  },

  {
    title: 'Software Usage',
    icon: 'bi bi-bar-chart-line',
    sidebar_title
  },

  {
    title: 'Process Id',
    icon: 'bi bi-hash',
    sidebar_title
  },

  {
    title: 'Website',
    icon: 'bi bi-globe',
    sidebar_title
  },

  {
    title: 'License Harvest',
    icon: 'bi bi-shield-check',
    sidebar_title
  },

  {
    title: 'License Harvest Summary',
    icon: 'bi bi-clipboard-data',
    sidebar_title
  }
]
})