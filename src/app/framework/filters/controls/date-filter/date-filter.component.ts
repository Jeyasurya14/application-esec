import { Component, input, output, model, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'filter-date',
  standalone: true,
  template: `
    <div class="date-filter" [style.width.px]="width()">
      @if (label()) {
        <label class="date-filter__label">{{ label() }}</label>
      }
      <div class="date-filter__wrap">
        <i class="bi bi-calendar3 date-filter__icon"></i>
        <input
          type="date"
          class="date-filter__input"
          [value]="value()"
          (input)="onChange($event)"
          [disabled]="disabled()"
        />
      </div>
    </div>
  `,
  styles: [
    `
    // @use '../../../../styles/variables' as *;
      :host {
        display: inline-flex;
      }
      .date-filter {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 140px;
      }
      .date-filter__label {
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
        padding-left: 2px;
      }
      .date-filter__wrap {
        position: relative;
        display: flex;
      }
      .date-filter__icon {
        position: absolute;
        left: 9px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: #9ca3af;
        pointer-events: none;
      }
      .date-filter__input {
        width: 100%;
        height: 32px;
        padding: 0 10px 0 30px;
        border: 1px solid #d9dee7;
        border-radius: 6px;
        font-size: 13px;
        outline: none;
        background: #fff;
        font-family: inherit;
        color: #374151;
        transition:
          border-color 120ms ease,
          box-shadow 120ms ease;
      }
      .date-filter__input:hover {
        border-color: #b0b8c4;
      }
      .date-filter__input:focus {
        border-color: #2b78ff;
        box-shadow: 0 0 0 2px rgba(43, 120, 255, 0.12);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateFilterComponent {
  readonly value = model<string>('');
  readonly label = input<string>();
  readonly width = input(140);
  readonly disabled = input(false);
  readonly changed = output<string>();

  onChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.changed.emit(val);
  }
}
