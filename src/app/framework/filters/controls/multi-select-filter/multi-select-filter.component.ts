import { Component, input, output, model, HostListener, ChangeDetectionStrategy, ElementRef, inject, signal } from '@angular/core';
import { FilterOption } from '../../models';

@Component({
  selector: 'filter-multi-select',
  standalone: true,
  template: `
    <div class="multi-select" [style.width.px]="width()" [class.multi-select--open]="open()">
      @if (label()) {
        <label class="multi-select__label">{{ label() }}</label>
      }
      <div
        class="multi-select__trigger"
        (click)="toggleOpen()"
        role="combobox"
        aria-haspopup="listbox"
        [attr.aria-expanded]="open()"
      >
        <span
          class="multi-select__text"
          [class.multi-select__text--empty]="selectedLabels().length === 0"
        >
          @if (selectedLabels().length === 0) {
            {{ placeholder() || 'Select...' }}
          } @else {
            <span class="multi-select__chips">
              @for (sl of selectedLabels().slice(0, 3); track sl) {
                <span class="multi-select__chip">{{ sl }}</span>
              }
              @if (selectedLabels().length > 3) {
                <span class="multi-select__chip multi-select__chip--more"
                  >+{{ selectedLabels().length - 3 }}</span
                >
              }
            </span>
          }
        </span>
        <i
          class="bi bi-chevron-down multi-select__arrow"
          [class.multi-select__arrow--open]="open()"
        ></i>
      </div>
      @if (open()) {
        <div class="multi-select__dropdown" (click)="$event.stopPropagation()">
          <div class="multi-select__search">
            <i class="bi bi-search"></i>
            <input
              type="text"
              class="multi-select__search-input"
              placeholder="Filter options..."
              (input)="filterOpts.set($any($event.target).value)"
            />
          </div>
          <div class="multi-select__actions">
            <button class="multi-select__action" (click)="selectAll()">Select All</button>
            <button class="multi-select__action" (click)="clearAll()">Clear</button>
            <span class="multi-select__count">{{ value().length }} selected</span>
          </div>
          <div class="multi-select__options">
            @for (opt of filteredOptions(); track String(opt.value)) {
              <label
                class="multi-select__option"
                [class.multi-select__option--checked]="isSelected(opt)"
                (click)="toggleOption(opt)"
              >
                <span
                  class="multi-select__checkbox"
                  [class.multi-select__checkbox--checked]="isSelected(opt)"
                >
                  @if (isSelected(opt)) {
                    <i class="bi bi-check"></i>
                  }
                </span>
                <span>{{ opt.label }}</span>
              </label>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        position: relative;
        outline: none;
      }
      .multi-select {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 160px;
        position: relative;
      }
      .multi-select__label {
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
        padding-left: 2px;
      }
      .multi-select__trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 32px;
        padding: 0 10px;
        border: 1px solid #d9dee7;
        border-radius: 6px;
        background: #fff;
        cursor: pointer;
        transition:
          border-color 120ms ease,
          box-shadow 120ms ease;
        gap: 6px;
      }
      .multi-select__trigger:hover {
        border-color: #b0b8c4;
      }
      .multi-select--open .multi-select__trigger {
        border-color: #2b78ff;
        box-shadow: 0 0 0 2px rgba(43, 120, 255, 0.12);
      }
      .multi-select__text {
        flex: 1;
        min-width: 0;
        font-size: 13px;
        color: #374151;
      }
      .multi-select__text--empty {
        color: #9ca3af;
      }
      .multi-select__chips {
        display: flex;
        align-items: center;
        gap: 3px;
        flex-wrap: nowrap;
        overflow: hidden;
      }
      .multi-select__chip {
        display: inline-flex;
        align-items: center;
        padding: 1px 6px;
        background: #eff6ff;
        border-radius: 3px;
        font-size: 11px;
        color: #1e40af;
        white-space: nowrap;
      }
      .multi-select__chip--more {
        background: #f3f4f6;
        color: #6b7280;
      }
      .multi-select__arrow {
        font-size: 11px;
        color: #9ca3af;
        flex-shrink: 0;
        transition: transform 200ms ease;
      }
      .multi-select__arrow--open {
        transform: rotate(180deg);
        color: #2b78ff;
      }
      .multi-select__dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: 4px;
        background: #fff;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        box-shadow:
          0 10px 25px rgba(0, 0, 0, 0.08),
          0 4px 10px rgba(0, 0, 0, 0.04);
        z-index: 200;
        overflow: hidden;
      }
      .multi-select__search {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 10px;
        border-bottom: 1px solid #f3f4f6;
      }
      .multi-select__search i {
        font-size: 12px;
        color: #9ca3af;
      }
      .multi-select__search-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 12px;
        font-family: inherit;
        color: #374151;
      }
      .multi-select__search-input::placeholder {
        color: #9ca3af;
      }
      .multi-select__actions {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-bottom: 1px solid #f3f4f6;
      }
      .multi-select__action {
        border: none;
        background: transparent;
        font-size: 11px;
        color: #2b78ff;
        cursor: pointer;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: inherit;
        transition: background 120ms ease;
      }
      .multi-select__action:hover {
        background: #eff6ff;
      }
      .multi-select__count {
        margin-left: auto;
        font-size: 11px;
        color: #9ca3af;
      }
      .multi-select__options {
        max-height: 220px;
        overflow-y: auto;
        padding: 4px;
      }
      .multi-select__option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        color: #374151;
        transition: background 120ms ease;
      }
      .multi-select__option:hover {
        background: #f9fafb;
      }
      .multi-select__option--checked {
        background: #f9fafb;
      }
      .multi-select__checkbox {
        width: 16px;
        height: 16px;
        border: 2px solid #d1d5db;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all 120ms ease;
      }
      .multi-select__checkbox--checked {
        background: #2b78ff;
        border-color: #2b78ff;
      }
      .multi-select__checkbox i {
        font-size: 10px;
        color: #fff;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectFilterComponent {
  private readonly el = inject(ElementRef);

  readonly value = model<(string | number)[]>([]);
  readonly label = input<string>();
  readonly placeholder = input<string>();
  readonly options = input<readonly FilterOption[]>([]);
  readonly width = input(160);
  readonly disabled = input(false);
  readonly changed = output<(string | number)[]>();

  readonly open = model(false);
  readonly String = String;
  readonly filterOpts = signal('');

  filteredOptions(): FilterOption[] {
    const q = this.filterOpts().toLowerCase();
    return q
      ? [...this.options()].filter((o) => o.label.toLowerCase().includes(q))
      : [...this.options()];
  }

  selectedLabels(): string[] {
    return this.options()
      .filter((o) => this.value().includes(String(o.value)))
      .map((o) => o.label);
  }

  isSelected(opt: FilterOption): boolean {
    return this.value().includes(String(opt.value));
  }

  toggleOption(opt: FilterOption): void {
    const strVal = String(opt.value);
    const current = this.value();
    const updated = current.includes(strVal)
      ? current.filter((v) => v !== strVal)
      : [...current, strVal];
    this.value.set(updated);
    this.changed.emit(updated);
  }

  selectAll(): void {
    const all = this.options().map((o) => String(o.value));
    this.value.set(all);
    this.changed.emit(all);
  }

  clearAll(): void {
    this.value.set([]);
    this.changed.emit([]);
  }

  toggleOpen(): void {
    this.open.update((v) => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent): void {
    if (this.open() && !this.el.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }
}
