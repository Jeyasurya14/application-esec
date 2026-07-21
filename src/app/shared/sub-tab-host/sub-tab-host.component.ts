import { Component, computed, effect, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { SubTabDefinition } from './sub-tab.model';
import { FrameworkGridComponent, GridContext } from '../../framework/grid';
import { gridColumns } from '../../framework/columns';
import { InlineDataSource } from './inline-datasource';
import { FilterConfig } from '../../framework/filters';

@Component({
  selector: 'app-sub-tab-host',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './sub-tab-host.component.html',
  styleUrl: './sub-tab-host.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubTabHostComponent {
  readonly tabs = input.required<readonly SubTabDefinition[]>();
  readonly hostId = input('sub-tab');
  
  readonly activeId = signal<string>('');
  readonly activeChildId = signal<string>(''); 

  constructor() {
    effect(() => {
      const tabs = this.tabs();
      if (tabs.length > 0 && !this.activeId()) {
        this.initializeTabState(tabs[0]);
      }
    });
  }

  readonly activeTab = computed(() => this.tabs().find((t) => t.id === this.activeId()));

  
  readonly activeChildTab = computed(() => {
    const parent = this.activeTab();
    if (!parent?.children) return null;
    return parent.children.find((c) => c.id === this.activeChildId()) || null;
  });

  
  readonly gridContext = computed<GridContext<unknown> | null>(() => {
    const tab = this.activeChildTab() || this.activeTab();
    if (!tab) return null;

    let filterConfig: FilterConfig | undefined;
    if (tab.searchFields && tab.searchFields.length > 0) {
      filterConfig = {
        controls: [
          {
            id: 'search',
            type: 'search',
            placeholder: 'Search...',
            width: 240,
            param: 'search',
            filter: {
              type: 'contains',
              field: tab.searchFields[0],
              fields: [...tab.searchFields],
            },
          },
        ],
      };
    }

    return {
      tabId: `${this.hostId()}.${tab.id}`,
      title: tab.label,
      columns: gridColumns(...tab.columns),
      datasource: InlineDataSource,
      filterConfig,
      inlineConfig: {
        procedure: tab.procedure,
        columns: tab.columns,
        params: (tab as any).params, 
      },
    };
  });

  readonly activeGridContexts = computed(() => {
    const context = this.gridContext();
    return context ? [context] : [];
  });

  selectTab(tab: SubTabDefinition): void {
    this.initializeTabState(tab);
  }

  selectChildTab(childTab: SubTabDefinition): void {
    this.activeChildId.set(childTab.id);
  }

  private initializeTabState(tab: SubTabDefinition): void {
    this.activeId.set(tab.id);
    // Auto-select first child if available, otherwise clear child state
    if (tab.children && tab.children.length > 0) {
      this.activeChildId.set(tab.children[0].id);
    } {
      this.activeChildId.set('');
    }
  }
}
