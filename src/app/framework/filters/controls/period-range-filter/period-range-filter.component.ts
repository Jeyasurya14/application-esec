import { Component, input, output, model, ChangeDetectionStrategy } from '@angular/core';
import { FilterOption } from '../../models';

@Component({
  selector: 'filter-period-range',
  standalone: true,
  template: `
    <div class="period-range" [style.width.px]="width()">
      @if (label()) {
        <label class="period-range__label">{{ label() }}</label>
      }
      <div class="period-range__wrap">
        <select class="period-range__select" [value]="value()" (change)="onSelect($event)">
          @for (opt of options(); track opt.value) {
            <option [value]="opt.value">{{ opt.label }}</option>
          }
        </select>
        <i class="bi bi-chevron-down period-range__arrow"></i>
      </div>
    </div>
  `,
  styles: [
    `
    // @use '../../../../styles/variables' as *;
      :host {
        display: inline-flex;
      }
      .period-range {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 140px;
      }
      .period-range__label {
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
        padding-left: 2px;
      }
      .period-range__wrap {
        position: relative;
        display: flex;
      }
      .period-range__select {
        width: 100%;
        height: 32px;
        padding: 0 32px 0 10px;
        border: 1px solid #d9dee7;
        border-radius: 6px;
        font-size: 13px;
        outline: none;
        background: #fff;
        cursor: pointer;
        transition:
          border-color 120ms ease,
          box-shadow 120ms ease;
        appearance: none;
        color: #374151;
      }
      .period-range__select:hover {
        border-color: #b0b8c4;
      }
      .period-range__select:focus {
        border-color: #2b78ff;
        box-shadow: 0 0 0 2px rgba(43, 120, 255, 0.12);
      }
      .period-range__arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 11px;
        color: #9ca3af;
        pointer-events: none;
        transition: transform 120ms ease;
      }
      .period-range__select:focus ~ .period-range__arrow {
        color: #2b78ff;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodRangeFilterComponent {
  readonly value = model<string>('');
  readonly label = input<string>();
  readonly options = input<readonly FilterOption[]>([]);
  readonly width = input(200);
  readonly disabled = input(false);
  readonly changed = output<string>();

  onSelect(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.value.set(val);
    this.changed.emit(val);
  }
}
