import { Component, computed, inject, input, OnDestroy, output, signal } from '@angular/core';
import { FilterConfig, FilterState } from '../../models';
import { FilterControl } from '../../models/filter-control.model';
import { FilterService } from '../../services';
import { GridStateService } from '../../../grid/services/grid-state.service';
import { SearchFilterComponent } from '../../controls/search-filter';
import { TextFilterComponent } from '../../controls/text-filter';
import { SelectFilterComponent } from '../../controls/select-filter';
import { MultiSelectFilterComponent } from '../../controls/multi-select-filter';
import { DateFilterComponent } from '../../controls/date-filter';
import { DateRangeFilterComponent } from '../../controls/date-range-filter';
import { ToggleFilterComponent } from '../../controls/toggle-filter';
import { ChipFilterComponent } from '../../controls/chip-filter';
import { NumericRangeFilterComponent } from '../../controls/numeric-range-filter';
import { TagFilterComponent } from '../../controls/tag-filter';
import { PeriodRangeFilterComponent } from '../../controls/period-range-filter';
import { GroupedSelectFilterComponent } from '../../controls/grouped-select-filter';
import { CheckboxGroupFilterComponent } from '../../controls/checkbox-group-filter';
import { AutocompleteFilterComponent } from '../../controls/autocomplete-filter';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

const CONTROL_TYPES_IMMEDIATE = new Set<string>([
  'select',
  'multi-select',
  'chip',
  'toggle',
  'period-range',
  'grouped-select',
  'checkbox-group',
  'date',
  'date-range',
  'numeric-range',
  'tag',
]);

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [
    SearchFilterComponent,
    TextFilterComponent,
    SelectFilterComponent,
    MultiSelectFilterComponent,
    DateFilterComponent,
    DateRangeFilterComponent,
    ToggleFilterComponent,
    ChipFilterComponent,
    NumericRangeFilterComponent,
    TagFilterComponent,
    PeriodRangeFilterComponent,
    GroupedSelectFilterComponent,
    CheckboxGroupFilterComponent,
    AutocompleteFilterComponent,
  ],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent implements OnDestroy {
  readonly config = input.required<FilterConfig>();
  readonly changed = output<FilterState>();
  readonly tabId = input.required<string>();
  readonly debounceMs = input(300);

  private readonly filters = inject(FilterService);
  readonly gridState = inject(GridStateService);

  private readonly debounce$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  readonly expanded = signal(true);

  constructor() {
    this.debounce$
      .pipe(debounceTime(this.debounceMs()), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.emit());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  readonly activeCount = computed(() => {
    const state = this.filters.get(this.tabId());
    return Object.values(state).filter(
      (v) => v !== '' && v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0),
    ).length;
  });

  readonly hasSearch = computed(() => this.config().controls.some((c) => c.type === 'search'));

  readonly bodyControls = computed(() => this.config().controls.filter((c) => c.type !== 'search'));

  readonly searchControl = computed(() => this.config().controls.find((c) => c.type === 'search'));

  private emit(): void {
    this.changed.emit(this.filters.get(this.tabId()));
  }

  onChange(id: string, value: unknown, ctrl?: FilterControl): void {
    this.filters.set(this.tabId(), id, value);
    if (ctrl?.immediate || CONTROL_TYPES_IMMEDIATE.has(ctrl?.type ?? '')) {
      this.emit();
    } else {
      this.debounce$.next();
    }
  }

  onReset(): void {
    this.filters.reset(this.tabId());
    this.emit();
  }

  toggleExpanded(): void {
    this.expanded.update((v) => !v);
  }
}
