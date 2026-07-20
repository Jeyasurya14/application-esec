import {
  Component,
  Type,
  ViewChild,
  ViewContainerRef,
  computed,
  effect,
  inject,
  ComponentRef,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { WorkspaceService } from '../services/workspace.service';
import { ModuleRegistry } from '../../../core/registry/module.registry';

@Component({
  selector: 'app-workspace-host',
  standalone: true,
  template: `
    @if (loading()) {
      <div class="workspace-loading">
        <div class="workspace-spinner"></div>
        <span>Loading...</span>
      </div>
    }
    <ng-container #host></ng-container>
  `,
  host: {
    'style.display': 'flex',
    'style.flex': '1',
    'style.width': '100%',
    'style.height': '100%',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceHost {
  private readonly workspace = inject(WorkspaceService);
  private readonly register = inject(ModuleRegistry);

  @ViewChild('host', { read: ViewContainerRef, static: true })
  private host!: ViewContainerRef;

  private readonly cache = new Map<string, ComponentRef<unknown>>();
  private readonly pending = new Set<string>();
  private currentTabId: string | null = null;

  readonly activeTab = computed(() => this.workspace.activeTab());
  readonly loading = signal(false);

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

    if (this.pending.has(tabId)) return;
    this.pending.add(tabId);

    this.resolveComponent(tabId, screenId);
  }

  private async resolveComponent(tabId: string, screenId: string): Promise<void> {
    this.loading.set(true);
    try {
      const component = await this.register.resolveComponent(screenId);
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
    } catch (error) {
      console.error('Failed to load component for tab', tabId, error);
    } finally {
      this.pending.delete(tabId);
      this.loading.set(false);
    }
  }
}
