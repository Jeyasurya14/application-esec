import { Component, input, output, model } from '@angular/core';
import { FilterOption } from '../../models';

@Component({
  selector: 'filter-chip',
  standalone: true,
  template: `
    <div class="chip-filter" [style.width.px]="width()">
      @if (label()) {
        <label class="chip-filter__label">{{ label() }}</label>
      }
      <div class="chip-filter__group">
        @for (opt of options(); track String(opt.value)) {
          <button
            class="chip-filter__chip"
            [class.chip-filter__chip--active]="value() === String(opt.value)"
            (click)="select(String(opt.value))"
          >
            @if (value() === String(opt.value)) {
              <i class="bi bi-check-lg chip-filter__check"></i>
            }
            {{ opt.label }}
          </button>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .chip-filter {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .chip-filter__label {
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
        padding-left: 2px;
      }
      .chip-filter__group {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
        min-height: 32px;
        align-items: center;
      }
      .chip-filter__chip {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        padding: 4px 12px;
        border: 1px solid #d9dee7;
        border-radius: 16px;
        background: #fff;
        font-size: 12px;
        font-weight: 500;
        color: #6b7280;
        cursor: pointer;
        transition: all 150ms ease;
        white-space: nowrap;
        font-family: inherit;
      }
      .chip-filter__chip:hover {
        border-color: #b0b8c4;
        color: #374151;
        background: #f9fafb;
      }
      .chip-filter__chip--active {
        background: #2b78ff;
        border-color: #2b78ff;
        color: #fff;
        box-shadow: 0 1px 3px rgba(43, 120, 255, 0.25);
      }
      .chip-filter__chip--active:hover {
        background: #1a5fd9;
        border-color: #1a5fd9;
        color: #fff;
      }
      .chip-filter__check {
        font-size: 10px;
      }
    `,
  ],
})
export class ChipFilterComponent {
  readonly value = model<string>('');
  readonly label = input<string>();
  readonly options = input<readonly FilterOption[]>([]);
  readonly width = input(200);
  readonly disabled = input(false);
  readonly changed = output<string>();
  readonly String = String;

  select(val: string): void {
    const next = this.value() === val ? '' : val;
    this.value.set(next);
    this.changed.emit(next);
  }
}
