import { Type } from "@angular/core";


export interface screenDefnition{
    id: string;
    title: string;
    module:string;
    icon?:string;
    layout:string;
    // widgets:WidgetDefinition[];
    sidebar_title:string;
    component: Type<unknown>;
    allowDuplicate: boolean;
    allowPin:boolean;
    multipleInstances:boolean;
}