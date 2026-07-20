import { Type } from '@angular/core';

export interface Screen {
  id: string;
  moduleId: string;
  title: string;
  icon?: string;
  order: number;
  sidebar_title: string;
  component?: Type<unknown>;
  loadComponent?: () => Promise<Type<unknown>>;
  enabled: boolean;
}
