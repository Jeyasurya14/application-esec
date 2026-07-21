import { Component, input, output, model, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'filter-date-range',
  standalone: true,
  template: `
    <div class="date-range" [style.width.px]="width()">
      @if (label()) {
        <label class="date-range__label">{{ label() }}</label>
      }
      <div class="date-range__inputs">
        <div class="date-range__field">
          <i class="bi bi-calendar3 date-range__icon"></i>
          <input
            type="date"
            class="date-range__input"
            [value]="start()"
            (input)="onStart($event)"
            [disabled]="disabled()"
          />
          @if (start()) {
            <button class="date-range__clear" (click)="clearStart()" tabindex="-1">&times;</button>
          }
        </div>
        <span class="date-range__sep">→</span>
        <div class="date-range__field">
          <i class="bi bi-calendar3 date-range__icon"></i>
          <input
            type="date"
            class="date-range__input"
            [value]="end()"
            (input)="onEnd($event)"
            [disabled]="disabled()"
          />
          @if (end()) {
            <button class="date-range__clear" (click)="clearEnd()" tabindex="-1">&times;</button>
          }
        </div>
        @if (start() || end()) {
          <button class="date-range__reset" (click)="clearAll()" title="Clear dates">
            <i class="bi bi-x-lg"></i>
          </button>
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
      .date-range {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .date-range__label {
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
        padding-left: 2px;
      }
      .date-range__inputs {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .date-range__field {
        position: relative;
        display: flex;
        flex: 1;
        min-width: 0;
      }
      .date-range__icon {
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: #9ca3af;
        pointer-events: none;
      }
      .date-range__input {
        width: 100%;
        height: 32px;
        padding: 0 22px 0 28px;
        border: 1px solid #d9dee7;
        border-radius: 6px;
        font-size: 13px;
        outline: none;
        background: #fff;
        font-family: inherit;
        transition:
          border-color 120ms ease,
          box-shadow 120ms ease;
        color: #374151;
      }
      .date-range__input:hover {
        border-color: #b0b8c4;
      }
      .date-range__input:focus {
        border-color: #2b78ff;
        box-shadow: 0 0 0 2px rgba(43, 120, 255, 0.12);
      }
      .date-range__clear {
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #9ca3af;
        font-size: 13px;
        opacity: 0;
        transition: opacity 120ms ease;
      }
      .date-range__field:hover .date-range__clear {
        opacity: 1;
      }
      .date-range__clear:hover {
        background: #f3f4f6;
        color: #6b7280;
      }
      .date-range__sep {
        font-size: 12px;
        color: #b0b8c4;
        flex-shrink: 0;
        font-weight: 300;
      }
      .date-range__reset {
        width: 32px;
        height: 32px;
        border: 1px solid transparent;
        border-radius: 6px;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #9ca3af;
        font-size: 10px;
        flex-shrink: 0;
        transition: all 120ms ease;
      }
      .date-range__reset:hover {
        background: #fef2f2;
        color: #ef4444;
        border-color: #fecaca;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeFilterComponent {
  readonly start = model<string>('');
  readonly end = model<string>('');
  readonly label = input<string>();
  readonly width = input(300);
  readonly disabled = input(false);
  readonly changed = output<{ start: string; end: string }>();

  onStart(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.start.set(val);
    this.emit();
  }
  onEnd(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.end.set(val);
    this.emit();
  }
  clearStart(): void {
    this.start.set('');
    this.emit();
  }
  clearEnd(): void {
    this.end.set('');
    this.emit();
  }
  clearAll(): void {
    this.start.set('');
    this.end.set('');
    this.emit();
  }
  private emit(): void {
    this.changed.emit({ start: this.start(), end: this.end() });
  }
}
