import { defineModule, ModuleRegistration } from "../../core/registry/define-module";

const sidebar_title = 'REP'
export const ReportManifest: ModuleRegistration = defineModule({
    id:'report',
    title:'My Report',
    description:'This is a Report Section',
    icon:'bi-journal',
    order:4,
    screens:[
  {
    title: 'Usage',
    icon: 'bi bi-graph-up',
    sidebar_title
  },

  {
    title: 'Server',
    icon: 'bi bi-server',
    sidebar_title
  },

  {
    title: 'Feature',
    icon: 'bi bi-stars',
    sidebar_title
  },

  {
    title: 'Division',
    icon: 'bi bi-diagram-3',
    sidebar_title
  },

  {
    title: 'Department',
    icon: 'bi bi-building',
    sidebar_title
  },

  {
    title: 'Group',
    icon: 'bi bi-people',
    sidebar_title
  },

  {
    title: 'Report Type 1',
    icon: 'bi bi-file-earmark-bar-graph',
    sidebar_title
  },

  {
    title: 'Agent (Windows)',
    icon: 'bi bi-windows',
    sidebar_title
  },

  {
    title: 'Process',
    icon: 'bi bi-cpu',
    sidebar_title
  }
]
})