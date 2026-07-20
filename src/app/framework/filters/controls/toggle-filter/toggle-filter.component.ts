import { Component, input, output, model, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'filter-toggle',
  standalone: true,
  template: `
    <label
      class="toggle-filter"
      [style.width.px]="width()"
      [class.toggle-filter--checked]="value()"
    >
      <span class="toggle-filter__switch">
        <input
          type="checkbox"
          [checked]="value()"
          (change)="onToggle($event)"
          [disabled]="disabled()"
        />
        <span class="toggle-filter__slider"></span>
        <span class="toggle-filter__dot"></span>
      </span>
      @if (label()) {
        <span class="toggle-filter__label">{{ label() }}</span>
      }
    </label>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .toggle-filter {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        min-height: 32px;
        user-select: none;
      }
      .toggle-filter__switch {
        position: relative;
        display: inline-block;
        width: 36px;
        height: 20px;
        flex-shrink: 0;
      }
      .toggle-filter__switch input {
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        z-index: 1;
      }
      .toggle-filter__slider {
        position: absolute;
        inset: 0;
        background: #d1d5db;
        border-radius: 10px;
        transition:
          background 200ms ease,
          box-shadow 200ms ease;
      }
      .toggle-filter__switch input:focus-visible ~ .toggle-filter__slider {
        box-shadow: 0 0 0 2px rgba(43, 120, 255, 0.3);
      }
      .toggle-filter__dot {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 14px;
        height: 14px;
        background: #fff;
        border-radius: 50%;
        transition:
          transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1),
          box-shadow 200ms ease;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      }
      .toggle-filter--checked .toggle-filter__slider {
        background: #2b78ff;
      }
      .toggle-filter--checked .toggle-filter__dot {
        transform: translateX(16px);
        box-shadow: 0 1px 3px rgba(43, 120, 255, 0.3);
      }
      .toggle-filter__label {
        font-size: 13px;
        color: #374151;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleFilterComponent {
  readonly value = model(false);
  readonly label = input<string>();
  readonly width = input(130);
  readonly disabled = input(false);
  readonly changed = output<boolean>();

  onToggle(event: Event): void {
    const val = (event.target as HTMLInputElement).checked;
    this.value.set(val);
    this.changed.emit(val);
  }
}
