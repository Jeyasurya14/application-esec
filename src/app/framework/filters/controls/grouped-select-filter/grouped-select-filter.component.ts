import { Component, input, output, model } from '@angular/core';
import { FilterOptionGroup } from '../../models';

@Component({
  selector: 'filter-grouped-select',
  standalone: true,
  template: `
    <div class="grouped-select" [style.width.px]="width()">
      @if (label()) {
        <label class="grouped-select__label">{{ label() }}</label>
      }
      <div class="grouped-select__wrap">
        <select
          class="grouped-select__input"
          [value]="value()"
          (change)="onChange($event)"
          [disabled]="disabled()"
        >
          @for (group of groups(); track group.label) {
            <optgroup [label]="group.label">
              @for (opt of group.options; track opt.value) {
                <option [value]="opt.value">{{ opt.label }}</option>
              }
            </optgroup>
          }
        </select>
        <i class="bi bi-chevron-down grouped-select__arrow"></i>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .grouped-select {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 140px;
      }
      .grouped-select__label {
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
        padding-left: 2px;
      }
      .grouped-select__wrap {
        position: relative;
        display: flex;
      }
      .grouped-select__input {
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
      .grouped-select__input:hover {
        border-color: #b0b8c4;
      }
      .grouped-select__input:focus {
        border-color: #2b78ff;
        box-shadow: 0 0 0 2px rgba(43, 120, 255, 0.12);
      }
      .grouped-select__input:disabled {
        background: #f9fafb;
        color: #9ca3af;
        cursor: not-allowed;
      }
      .grouped-select__arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 11px;
        color: #9ca3af;
        pointer-events: none;
      }
      .grouped-select__input:focus ~ .grouped-select__arrow {
        color: #2b78ff;
      }
    `,
  ],
})
export class GroupedSelectFilterComponent {
  readonly value = model<string>('');
  readonly label = input<string>();
  readonly groups = input<readonly FilterOptionGroup[]>([]);
  readonly width = input(180);
  readonly disabled = input(false);
  readonly changed = output<string>();

  onChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.value.set(val);
    this.changed.emit(val);
  }
}
