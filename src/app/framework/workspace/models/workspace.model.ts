import { Screen } from "../../../core/models/screen.model";


export interface WorkspaceTab{
    id:string;
    screen: Screen;
    title:string;
    icon?:string;
    sidebar_title:string;
    active:boolean;
    pinned:boolean;
    closable:boolean;
    dirty:boolean;
    state?:Record<string , unknown>
}

// const tab: WorkspaceTab = {
//   id: 'ws-1',
//   screen: agentLinuxScreen,
//   title: 'Agent (Linux)',
//   active: true,
//   pinned: false,
//   closable: true,
//   dirty: false,
//   state: {
//     filters: {
//       department: 'IT'
//     }
//   }
// };