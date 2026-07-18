import { Type } from "@angular/core";
import { Module } from "../models/module.model";
import { Screen } from "../models/screen.model";
import { View } from "../models/view.model";

export interface screenDefnition{
    title: string;
    icon?:string;
    sidebar_title:string;
    component?:Type<unknown>
    // view?: readonly viewDefinition[]
}
export interface Moduledefinition{
    id:string;
    title:string;
    description:string;
    icon:string;
    order:number;
    screens: readonly screenDefnition[]
}

export interface ModuleRegistration{
    module : Module;
    screens: Screen[];
    // view: View[];
}


export interface viewDefinition{
    title:string
}

export function defineModule(definition:Moduledefinition):ModuleRegistration{
    const module : Module = {
        id: definition.id,
        title: definition.title,
        description:definition.description,
        icon: definition.icon,
        order: definition.order,
        enabled: true
    };
    const screens: Screen[] = definition.screens.map((screen, index) =>({
        id:`${definition.id}.${toId(screen.title)}`,
        moduleId: definition.id,
        title: screen.title,
        icon:screen.icon,
        sidebar_title:screen.sidebar_title,
        component:screen.component,
        order: index + 1,
        enabled: true,
    })

);

    // const views : View[] = [];
    // screen.views?.forEach((view, viewIndex) => {
    //     views.push(
    //         id:`${definition.id}.${toId(screen.title)}.${toId(view.title)}`,
    //     )
    // });
    return{module, screens};
}

function toId(value:string) : string{
    return value
    .toLowerCase()
    .replace(/[()]/g,'')
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}