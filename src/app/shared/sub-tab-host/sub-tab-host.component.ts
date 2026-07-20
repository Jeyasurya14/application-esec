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
  readonly activeId = signal<string>('');

  constructor() {
    effect(() => {
      const tabs = this.tabs();
      if (tabs.length > 0 && !this.activeId()) {
        this.activeId.set(tabs[0].id);
      }
    });
  }

  readonly activeTab = computed(() => this.tabs().find((t) => t.id === this.activeId()));

  readonly gridContext = computed<GridContext<unknown> | null>(() => {
    const tab = this.activeTab();
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
            filter: { type: 'contains', field: tab.searchFields[0], fields: [...tab.searchFields] },
          },
        ],
      };
    }

    return {
      tabId: tab.id,
      title: tab.label,
      columns: gridColumns(...tab.columns),
      datasource: InlineDataSource,
      filterConfig,
      inlineConfig: {
        procedure: tab.procedure,
        columns: tab.columns,
        params: tab.params,
      },
    };
  });

  selectTab(tab: SubTabDefinition): void {
    this.activeId.set(tab.id);
  }
}
