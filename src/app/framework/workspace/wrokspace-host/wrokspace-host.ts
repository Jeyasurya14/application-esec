import {
  Component,
  Type,
  ViewChild,
  ViewContainerRef,
  computed,
  effect,
  inject,
  ComponentRef,
} from '@angular/core';
import { WorkspaceService } from '../services/workspace.service';
import { ModuleRegistry } from '../../../core/registry/module.registry';

@Component({
  selector: 'app-workspace-host',
  standalone: true,
  template: `<ng-container #host></ng-container>`,
  host: {
    'style.display': 'flex',
    'style.flex': '1',
    'style.width': '100%',
    'style.height': '100%',
  },
})
export class WrokspaceHost {
  private readonly workspace = inject(WorkspaceService);
  private readonly register = inject(ModuleRegistry);

  @ViewChild('host', { read: ViewContainerRef, static: true })
  private host!: ViewContainerRef;

  private readonly cache = new Map<string, ComponentRef<unknown>>();
  private currentTabId: string | null = null;

  readonly activeTab = computed(() => this.workspace.activeTab());

  constructor() {
    effect(() => {
      const tab = this.activeTab();
      if (!tab) {
        this.host?.clear();
        this.currentTabId = null;
        return;
      }
      this.activateTab(tab.id, tab.screen.id);
    });
  }

  private activateTab(tabId: string, screenId: string): void {
    if (this.currentTabId === tabId) return;

    const cached = this.cache.get(tabId);
    if (cached) {
      if (this.currentTabId) {
        const currentRef = this.cache.get(this.currentTabId);
        if (currentRef) {
          this.host.detach(this.host.indexOf(currentRef.hostView));
        }
      }
      this.host.insert(cached.hostView);
      this.currentTabId = tabId;
      return;
    }

    const component = this.resolve(screenId);
    if (!component) return;

    if (this.currentTabId) {
      const currentRef = this.cache.get(this.currentTabId);
      if (currentRef) {
        this.host.detach(this.host.indexOf(currentRef.hostView));
      }
    }

    const ref = this.host.createComponent(component);
    this.cache.set(tabId, ref);
    this.currentTabId = tabId;
  }

  private resolve(screenId: string): Type<unknown> | null {
    return this.register.getComponent(screenId);
  }
}
