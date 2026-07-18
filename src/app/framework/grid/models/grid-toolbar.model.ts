export interface GridToolbarButton{
    id:string;
    title:string;
    icon:string;
    disabled?:boolean;
    visible?:boolean;
}
export interface GridToolbar{
    title:string;
    buttons:readonly GridToolbarButton[];
}