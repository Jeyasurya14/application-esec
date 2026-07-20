import { Component, input, output, model, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'filter-text',
  standalone: true,
  template: `
    <div class="text-filter" [style.width.px]="width()">
      @if (label()) {
        <label class="text-filter__label">{{ label() }}</label>
      }
      <input
        type="text"
        class="text-filter__input"
        [placeholder]="placeholder()"
        [value]="value()"
        (input)="onInput($event)"
        [disabled]="disabled()"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .text-filter {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 120px;
      }
      .text-filter__label {
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
        padding-left: 2px;
      }
      .text-filter__input {
        height: 32px;
        padding: 0 10px;
        border: 1px solid #d9dee7;
        border-radius: 6px;
        font-size: 13px;
        outline: none;
        background: #fff;
        color: #374151;
        transition:
          border-color 120ms ease,
          box-shadow 120ms ease;
      }
      .text-filter__input:hover {
        border-color: #b0b8c4;
      }
      .text-filter__input:focus {
        border-color: #2b78ff;
        box-shadow: 0 0 0 2px rgba(43, 120, 255, 0.12);
      }
      .text-filter__input::placeholder {
        color: #9ca3af;
      }
      .text-filter__input:disabled {
        background: #f9fafb;
        color: #9ca3af;
        cursor: not-allowed;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFilterComponent {
  readonly value = model<string>('');
  readonly label = input<string>();
  readonly placeholder = input<string>();
  readonly width = input(140);
  readonly disabled = input(false);
  readonly changed = output<string>();

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.changed.emit(val);
  }
}
