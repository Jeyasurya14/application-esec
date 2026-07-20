import { Component, input, output, model, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'filter-numeric-range',
  standalone: true,
  template: `
    <div class="num-range" [style.width.px]="width()">
      @if (label()) {
        <label class="num-range__label">{{ label() }}</label>
      }
      <div class="num-range__inputs">
        <input
          type="number"
          class="num-range__input"
          [placeholder]="placeholder() || 'Min'"
          [value]="min()"
          (input)="onMin($event)"
          [min]="absoluteMin()"
          [max]="absoluteMax()"
          [disabled]="disabled()"
        />
        <span class="num-range__sep">—</span>
        <input
          type="number"
          class="num-range__input"
          [placeholder]="placeholder() || 'Max'"
          [value]="max()"
          (input)="onMax($event)"
          [min]="absoluteMin()"
          [max]="absoluteMax()"
          [disabled]="disabled()"
        />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .num-range {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .num-range__label {
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
        padding-left: 2px;
      }
      .num-range__inputs {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .num-range__input {
        width: 80px;
        height: 32px;
        padding: 0 8px;
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
      .num-range__input:hover {
        border-color: #b0b8c4;
      }
      .num-range__input:focus {
        border-color: #2b78ff;
        box-shadow: 0 0 0 2px rgba(43, 120, 255, 0.12);
      }
      .num-range__input::placeholder {
        color: #9ca3af;
      }
      .num-range__sep {
        font-size: 13px;
        color: #b0b8c4;
        font-weight: 300;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumericRangeFilterComponent {
  readonly min = model<number | null>(null);
  readonly max = model<number | null>(null);
  readonly label = input<string>();
  readonly placeholder = input<string>();
  readonly absoluteMin = input<number>();
  readonly absoluteMax = input<number>();
  readonly width = input(200);
  readonly disabled = input(false);
  readonly changed = output<{ min: number | null; max: number | null }>();

  onMin(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.min.set(val ? Number(val) : null);
    this.emit();
  }
  onMax(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.max.set(val ? Number(val) : null);
    this.emit();
  }
  private emit(): void {
    this.changed.emit({ min: this.min(), max: this.max() });
  }
}
