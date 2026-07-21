import { Component, input, output, model, ChangeDetectionStrategy } from '@angular/core';
import { FilterOption } from '../../models';

@Component({
  selector: 'filter-select',
  standalone: true,
  template: `
    <div class="select-filter" [style.width.px]="width()">
      @if (label()) {
        <label class="select-filter__label">{{ label() }}</label>
      }
      <div class="select-filter__wrap">
        <select
          class="select-filter__input"
          [value]="value()"
          (change)="onChange($event)"
          [disabled]="disabled()"
        >
          @for (opt of options(); track opt.value) {
            <option [value]="opt.value">{{ opt.label }}</option>
          }
        </select>
        <i class="bi bi-chevron-down select-filter__arrow"></i>
      </div>
    </div>
  `,
  styles: [
    `
    // @use '../../../../styles/variables' as *;
      :host {
        display: inline-flex;
      }
      .select-filter {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 140px;
      }
      .select-filter__label {
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
        padding-left: 2px;
      }
      .select-filter__wrap {
        position: relative;
        display: flex;
      }
      .select-filter__input {
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
      .select-filter__input:hover {
        border-color: #b0b8c4;
      }
      .select-filter__input:focus {
        border-color: #2b78ff;
        box-shadow: 0 0 0 2px rgba(43, 120, 255, 0.12);
      }
      .select-filter__input:disabled {
        background: #f9fafb;
        color: #9ca3af;
        cursor: not-allowed;
      }
      .select-filter__arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 11px;
        color: #9ca3af;
        pointer-events: none;
        transition: transform 120ms ease;
      }
      .select-filter__input:focus ~ .select-filter__arrow {
        color: #2b78ff;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFilterComponent {
  readonly value = model<string>('');
  readonly label = input<string>();
  readonly options = input<readonly FilterOption[]>([]);
  readonly width = input(140);
  readonly disabled = input(false);
  readonly changed = output<string>();

  onChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.value.set(val);
    this.changed.emit(val);
  }
}
