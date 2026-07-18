export interface TabStripItem{
    id:string,
    title:string,
    icon?:string,
    sidebar_title:string,
    active:boolean,
    pinned?:boolean,
    closable?:boolean,
    dirty?:boolean,
}