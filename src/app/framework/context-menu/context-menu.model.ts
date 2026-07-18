export interface ContextMenuItem{
    id:string,
    text:string,
    icon?:string,
    disabled?:boolean,
    separator?:boolean,
    children?:readonly ContextMenuItem[];
    action: ()=>void;
}