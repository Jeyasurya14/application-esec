import { defineModule, ModuleRegistration } from "../../core/registry/define-module";
const sidebar_title = 'CLOUD'
export const cloudManifest: ModuleRegistration = defineModule({
    id:'Cloud',
    title:'Cloud',
    description:'This is a Cloud Section',
    icon:'bi-cloud',
    order: 6,
    screens: [
  { title: 'Uploader', icon: 'bi bi-upload', sidebar_title },

  { title: 'Adobe', icon: 'bi bi-file-earmark-pdf', sidebar_title },

  { title: 'AFT', icon: 'bi bi-arrow-left-right', sidebar_title },

  { title: 'Altium', icon: 'bi bi-cpu', sidebar_title },

  { title: 'AnyDesk', icon: 'bi bi-display', sidebar_title },

  { title: 'Autodesk', icon: 'bi bi-pencil-square', sidebar_title },

  { title: 'Automation Anywhere', icon: 'bi bi-robot', sidebar_title },

  { title: 'Aveva', icon: 'bi bi-diagram-3', sidebar_title },

  { title: 'Bentley', icon: 'bi bi-building', sidebar_title },

  { title: 'Bentley Real', icon: 'bi bi-building-check', sidebar_title },

  { title: 'Brixlab', icon: 'bi bi-box', sidebar_title },

  { title: 'Confluence', icon: 'bi bi-diagram-2', sidebar_title },

  { title: 'CrowdStrike', icon: 'bi bi-shield-check', sidebar_title },

  { title: 'CSI', icon: 'bi bi-hdd-network', sidebar_title },

  { title: 'Figma', icon: 'bi bi-palette', sidebar_title },

  { title: 'Forescout', icon: 'bi bi-eye', sidebar_title },

  { title: 'GitHub', icon: 'bi bi-github', sidebar_title },

  { title: 'Hexagon', icon: 'bi bi-hexagon', sidebar_title },

  { title: 'iServe', icon: 'bi bi-server', sidebar_title },

  { title: 'Jira', icon: 'bi bi-kanban', sidebar_title },

  { title: 'Kepware', icon: 'bi bi-cpu-fill', sidebar_title },

  { title: 'McAfee', icon: 'bi bi-shield-lock', sidebar_title },

  { title: 'Microsoft', icon: 'bi bi-windows', sidebar_title },

  { title: 'Milestone', icon: 'bi bi-flag', sidebar_title },

  { title: 'MT-Linki', icon: 'bi bi-link-45deg', sidebar_title },

  { title: 'MuleSoft', icon: 'bi bi-diagram-3-fill', sidebar_title },

  { title: 'Omnissa', icon: 'bi bi-cloud-check', sidebar_title },

  { title: 'OpenText ECM', icon: 'bi bi-folder2-open', sidebar_title },

  { title: 'Oracle', icon: 'bi bi-database', sidebar_title },

  { title: 'Qlik', icon: 'bi bi-bar-chart-line', sidebar_title },

  { title: 'Qualys', icon: 'bi bi-shield-fill-check', sidebar_title },

  { title: 'Red Hat', icon: 'bi bi-hdd-rack', sidebar_title },

  { title: 'Seclore', icon: 'bi bi-lock', sidebar_title },

  { title: 'SecurityScorecard', icon: 'bi bi-shield-shaded', sidebar_title },

  { title: 'Serena', icon: 'bi bi-gear', sidebar_title },

  { title: 'Snyk', icon: 'bi bi-bug', sidebar_title },

  { title: 'Sprinklr', icon: 'bi bi-chat-dots', sidebar_title },

  { title: 'Thales', icon: 'bi bi-key', sidebar_title },

  { title: 'Veritas', icon: 'bi bi-hdd-stack', sidebar_title },

  { title: 'Wiz', icon: 'bi bi-magic', sidebar_title },

  { title: 'Zoiper', icon: 'bi bi-telephone', sidebar_title }
]
})