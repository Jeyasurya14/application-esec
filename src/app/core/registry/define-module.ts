import { Type } from '@angular/core';
import { Module } from '../models/module.model';
import { Screen } from '../models/screen.model';

export interface ScreenDefinition {
  title: string;
  icon?: string;
  sidebar_title: string;
  component?: Type<unknown>;
  loadComponent?: () => Promise<Type<unknown>>;
}
export interface ModuleDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  screens: readonly ScreenDefinition[];
}

export interface ModuleRegistration {
  module: Module;
  screens: Screen[];
  // view: View[];
}

export function defineModule(definition: ModuleDefinition): ModuleRegistration {
  const module: Module = {
    id: definition.id,
    title: definition.title,
    description: definition.description,
    icon: definition.icon,
    order: definition.order,
    enabled: true,
  };
  const screens: Screen[] = definition.screens.map((screen, index) => ({
    id: `${definition.id}.${toId(screen.title)}`,
    moduleId: definition.id,
    title: screen.title,
    icon: screen.icon,
    sidebar_title: screen.sidebar_title,
    component: screen.component,
    loadComponent: screen.loadComponent,
    order: index + 1,
    enabled: true,
  }));

  return { module, screens };
}

function toId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
