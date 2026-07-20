import { Component, computed, inject, Injector, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { GridContext } from '../../models';
import { GridApiService } from '../../services/grid-api.service';
import {
  ColumnMovedEvent,
  ColumnResizedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { DEFAULT_GRID_OPTIONS, DEFAULT_GRID_THEME } from '../../configuration';
import { GridStateService } from '../../services/grid-state.service';
import { GridService } from '../../services';
import { GridToolbarComponent } from '../toolbar';
import { GridStatusBarComponent } from '../status-bar';
import { GridErrorOverlayComponent } from '../overlays/error';
import { GridLoadingOverlayComponent } from '../overlays/loading';
import { GridSelectionService } from '../../services/grid-selection.service';
import { GridLayoutService } from '../../services/grid-layout.service';
import { DataSource } from '../../../datasource/datasource';
import { InlineDataSource } from '../../../../shared/sub-tab-host/inline-datasource';
import { FilterBarComponent } from '../../../filters/components/filter-bar/filter-bar.component';
import { FilterState } from '../../../filters/models';
import { KpiCardsComponent } from '../../../../shared/kpi-cards';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'framework-grid',
  standalone: true,
  imports: [
    AgGridAngular,
    GridToolbarComponent,
    GridStatusBarComponent,
    FilterBarComponent,
    KpiCardsComponent,
  ],
  providers: [
    GridApiService,
    GridStateService,
    GridService,
    GridLayoutService,
    GridSelectionService,
    InlineDataSource,
  ],
  templateUrl: './framework-grid.component.html',
  styleUrl: './framework-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameworkGridComponent<T> {
  readonly context = input.required<GridContext<T>>();
  private readonly injector = inject(Injector);
  private readonly layout = inject(GridLayoutService);
  private readonly state = inject(GridStateService);
  private readonly api = inject(GridApiService);
  private readonly selection = inject(GridSelectionService);
  private readonly grid = inject(GridService);

  readonly rowData = signal<T[]>([]);

  readonly stateLoading = computed(() => this.state.loading());
  readonly stateError = computed(() => this.state.error());

  readonly gridOptions = computed<GridOptions>(() => ({
    ...DEFAULT_GRID_OPTIONS,
    ...this.context().options,
    loadingOverlayComponent: GridLoadingOverlayComponent,
    noRowsOverlayComponent: GridErrorOverlayComponent,
  }));

  readonly columns = computed(() => [...this.context().columns]);

  readonly theme = computed(() => this.context().theme ?? DEFAULT_GRID_THEME);

  readonly filterConfig = computed(() => this.context().filterConfig);

  readonly kpiConfig = computed(() => this.context().kpiConfig);

  private currentFilters: FilterState = {};

  selectionChanged(event: SelectionChangedEvent) {
    this.selection.update(event.api.getSelectedRows().length);
  }

  columnMoved() {
    this.layout.save(this.context().tabId);
  }

  columnResized(event: ColumnResizedEvent) {
    if (event.finished) this.layout.save(this.context().tabId);
  }

  columnVisible() {
    this.layout.save(this.context().tabId);
  }

  onFiltersChanged(filters: FilterState): void {
    this.currentFilters = { ...filters };
    this.reloadGrid();
  }

  private async reloadGrid(): Promise<void> {
    const api = this.api.getApi();
    if (!api) return;
    this.state.setLoading(true);
    api.showLoadingOverlay();

    await this.loadGridData(api);

    this.state.setLoading(false);
  }

  async gridReady(event: GridReadyEvent) {
    this.api.setApi(event.api);
    this.layout.restore(this.context().tabId);

    event.api.showLoadingOverlay();
    await this.loadGridData(event.api);
  }

  private async loadGridData(api: GridApi) {
    try {
      const context = this.context();
      const datasource = this.injector.get<DataSource<T>>(context.datasource);
      if (context.inlineConfig && datasource instanceof InlineDataSource) {
        datasource.configure(
          context.inlineConfig.procedure,
          context.inlineConfig.columns,
          context.inlineConfig.params,
        );
      }
      const response = await firstValueFrom(
        datasource.load({
          filters: this.currentFilters,
          sorts: [],
          page: { offset: 0, size: 0 },
          filterConfig: this.filterConfig() ?? undefined,
        }),
      );
      api.hideOverlay();
      this.rowData.set([...response.rows] as T[]);
      api.setGridOption('rowData', [...response.rows]);
      this.state.setError(null);
      this.grid.finishLoading();
      this.grid.setTotalRows(response.totalRows);
      requestAnimationFrame(() => api.sizeColumnsToFit());
    } catch (error) {
      this.state.setError('Unable to load data');
      this.rowData.set([]);
      api.setGridOption('rowData', []);
      api.showNoRowsOverlay();
      this.grid.finishLoading();
      console.error(error);
    }
  }
}
