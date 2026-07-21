import { Component, input, output, model, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'filter-search',
  standalone: true,
  template: `
    <div class="search-filter" [style.width.px]="width()" [class.search-filter--focused]="focused">
      <i class="bi bi-search search-filter__icon"></i>
      <input
        #input
        type="text"
        class="search-filter__input"
        [placeholder]="placeholder() || 'Search...'"
        [value]="value()"
        (input)="onInput($event)"
        (focus)="focused = true"
        (blur)="focused = false"
        (keydown.escape)="onClear()"
        [disabled]="disabled()"
      />
      @if (value()) {
        <button class="search-filter__clear" (click)="onClear()" tabindex="-1" title="Clear search">
          <i class="bi bi-x-lg"></i>
        </button>
      }
      @if (!value()) {
        <span class="search-filter__shortcut">⌘K</span>
      }
    </div>
  `,
  styles: [
    `
    // @use '../../../../styles/variables' as *;
      :host {
        display: inline-flex;
      }
      .search-filter {
        position: relative;
        display: flex;
        align-items: center;
        min-width: 200px;
      }
      .search-filter__icon {
        position: absolute;
        left: 10px;
        font-size: 13px;
        color: #9ca3af;
        pointer-events: none;
        transition: color 120ms ease;
      }
      .search-filter--focused .search-filter__icon {
        color: #2b78ff;
      }
      .search-filter__input {
        width: 100%;
        height: 32px;
        padding: 0 60px 0 32px;
        border: 1px solid #d9dee7;
        border-radius: 6px;
        font-size: 13px;
        outline: none;
        background: #fff;
        transition:
          border-color 120ms ease,
          box-shadow 120ms ease,
          background 120ms ease;
      }
      .search-filter__input:hover {
        border-color: #b0b8c4;
      }
      .search-filter__input:focus {
        border-color: #2b78ff;
        box-shadow: 0 0 0 2px rgba(43, 120, 255, 0.12);
        background: #fff;
      }
      .search-filter__input::placeholder {
        color: #9ca3af;
      }
      .search-filter__clear {
        position: absolute;
        right: 28px;
        width: 22px;
        height: 22px;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #9ca3af;
        font-size: 9px;
        transition: all 120ms ease;
        opacity: 0.7;
      }
      .search-filter__clear:hover {
        background: #f3f4f6;
        color: #6b7280;
        opacity: 1;
      }
      .search-filter__shortcut {
        position: absolute;
        right: 8px;
        font-size: 10px;
        color: #b0b8c4;
        background: #f3f4f6;
        padding: 1px 5px;
        border-radius: 3px;
        font-family: inherit;
        letter-spacing: 0.3px;
        pointer-events: none;
        line-height: 1.4;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent {
  readonly value = model<string>('');
  readonly placeholder = input<string>();
  readonly width = input(240);
  readonly disabled = input(false);
  readonly changed = output<string>();
  focused = false;

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.changed.emit(val);
  }

  onClear(): void {
    this.value.set('');
    this.changed.emit('');
  }
}
