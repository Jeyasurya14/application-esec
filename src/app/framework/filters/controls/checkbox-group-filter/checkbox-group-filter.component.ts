import { Component, input, output, model, ChangeDetectionStrategy } from '@angular/core';
import { FilterOption } from '../../models';

@Component({
  selector: 'filter-checkbox-group',
  standalone: true,
  template: `
    <div class="checkbox-group" [style.width.px]="width()">
      @if (label()) {
        <label class="checkbox-group__label">{{ label() }}</label>
      }
      <div class="checkbox-group__options">
        @for (opt of options(); track opt.value) {
          <label class="checkbox-group__item">
            <input
              type="checkbox"
              class="checkbox-group__input"
              [checked]="isSelected(opt)"
              (change)="onToggle(opt)"
            />
            <span class="checkbox-group__check"></span>
            <span class="checkbox-group__text">{{ opt.label }}</span>
          </label>
        }
      </div>
    </div>
  `,
  styles: [
    `
    // @use '../../../../styles/variables' as *;
      :host {
        display: inline-flex;
      }
      .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 160px;
      }
      .checkbox-group__label {
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
        padding-left: 2px;
        margin-bottom: 2px;
      }
      .checkbox-group__options {
        display: flex;
        align-items: center;
        gap: 0;
        height: 32px;
        border: 1px solid #d9dee7;
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
      }
      .checkbox-group__item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        height: 100%;
        padding: 0 8px;
        cursor: pointer;
        font-size: 12px;
        color: #6b7280;
        transition: all 120ms ease;
        border-right: 1px solid #d9dee7;
        user-select: none;
        position: relative;
      }
      .checkbox-group__item:last-child {
        border-right: none;
      }
      .checkbox-group__item:hover {
        background: #f9fafb;
      }
      .checkbox-group__input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
      .checkbox-group__check {
        width: 14px;
        height: 14px;
        border: 1.5px solid #d9dee7;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 120ms ease;
        flex-shrink: 0;
      }
      .checkbox-group__input:checked ~ .checkbox-group__check {
        background: #2b78ff;
        border-color: #2b78ff;
      }
      .checkbox-group__input:checked ~ .checkbox-group__check::after {
        content: '';
        width: 4px;
        height: 7px;
        border: solid #fff;
        border-width: 0 1.5px 1.5px 0;
        transform: rotate(45deg);
        margin-top: -1px;
      }
      .checkbox-group__input:checked ~ .checkbox-group__text {
        color: #2b78ff;
        font-weight: 500;
      }
      .checkbox-group__text {
        font-size: 12px;
        white-space: nowrap;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupFilterComponent {
  readonly selected = model<string[]>([]);
  readonly label = input<string>();
  readonly options = input<readonly FilterOption[]>([]);
  readonly width = input(320);
  readonly disabled = input(false);
  readonly changed = output<string[]>();

  isSelected(opt: FilterOption): boolean {
    return this.selected().includes(opt.value as string);
  }

  onToggle(opt: FilterOption): void {
    const value = opt.value as string;
    const current = [...this.selected()];
    const idx = current.indexOf(value);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else {
      current.push(value);
    }
    this.selected.set(current);
    this.changed.emit(current);
  }
}
