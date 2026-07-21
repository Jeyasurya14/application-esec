import { Component, input, output, model, signal, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { FilterOption } from '../../models';

@Component({
  selector: 'filter-autocomplete',
  standalone: true,
  template: `
    <div class="autocomplete" [style.width.px]="width()">
      @if (label()) {
        <label class="autocomplete__label">{{ label() }}</label>
      }
      <div class="autocomplete__wrap">
        <input
          class="autocomplete__input"
          [placeholder]="placeholder() || 'Type to search...'"
          [value]="inputValue()"
          (input)="onInput($event)"
          (focus)="open()"
          (blur)="closeDelayed()"
          (keydown.enter)="selectHighlighted()"
          (keydown.arrowdown)="highlightNext()"
          (keydown.arrowup)="highlightPrev()"
          [disabled]="disabled()"
        />
        @if (inputValue() && !disabled()) {
          <button class="autocomplete__clear" (mousedown)="clear()" tabindex="-1">
            <i class="bi bi-x"></i>
          </button>
        }
        <i class="bi bi-chevron-down autocomplete__arrow"></i>
      </div>
      @if (isOpen() && filteredOptions().length > 0) {
        <div class="autocomplete__dropdown">
          @for (opt of filteredOptions(); track opt.value; let i = $index) {
            <div
              class="autocomplete__option"
              [class.autocomplete__option--active]="i === highlightIndex()"
              (mousedown)="selectOption(opt)"
            >
              {{ opt.label }}
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
    //  @use '../../../../styles/variables' as *;
      :host {
        display: inline-flex;
        position: relative;
      }
      .autocomplete {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 160px;
        position: relative;
      }
      .autocomplete__label {
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
        padding-left: 2px;
      }
      .autocomplete__wrap {
        position: relative;
        display: flex;
      }
      .autocomplete__input {
        width: 100%;
        height: 32px;
        padding: 0 32px 0 10px;
        border: 1px solid #d9dee7;
        border-radius: 6px;
        font-size: 13px;
        outline: none;
        background: #fff;
        transition:
          border-color 120ms ease,
          box-shadow 120ms ease;
        color: #374151;
      }
      .autocomplete__input:hover {
        border-color: #b0b8c4;
      }
      .autocomplete__input:focus {
        border-color: #2b78ff;
        box-shadow: 0 0 0 2px rgba(43, 120, 255, 0.12);
      }
      .autocomplete__input:disabled {
        background: #f9fafb;
        color: #9ca3af;
        cursor: not-allowed;
      }
      .autocomplete__clear {
        position: absolute;
        right: 22px;
        top: 50%;
        transform: translateY(-50%);
        border: none;
        background: none;
        cursor: pointer;
        color: #9ca3af;
        font-size: 14px;
        padding: 0 2px;
        display: flex;
        align-items: center;
        line-height: 1;
      }
      .autocomplete__clear:hover {
        color: #6b7280;
      }
      .autocomplete__arrow {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 11px;
        color: #9ca3af;
        pointer-events: none;
      }
      .autocomplete__input:focus ~ .autocomplete__arrow {
        color: #2b78ff;
      }
      .autocomplete__dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 1000;
        background: #fff;
        border: 1px solid #d9dee7;
        border-radius: 6px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        max-height: 200px;
        overflow-y: auto;
        margin-top: 2px;
      }
      .autocomplete__option {
        padding: 8px 12px;
        font-size: 13px;
        color: #374151;
        cursor: pointer;
        transition: background 80ms ease;
      }
      .autocomplete__option:hover,
      .autocomplete__option--active {
        background: #eff6ff;
        color: #2b78ff;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteFilterComponent {
  readonly value = model<string>('');
  readonly label = input<string>();
  readonly placeholder = input<string>();
  readonly options = input<readonly FilterOption[]>([]);
  readonly width = input(200);
  readonly disabled = input(false);
  readonly changed = output<string>();

  readonly inputValue = signal('');
  readonly isOpen = signal(false);
  readonly highlightIndex = signal(-1);

  readonly filteredOptions = () => {
    const q = this.inputValue().toLowerCase();
    return this.options().filter((o) => o.label.toLowerCase().includes(q));
  };

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.inputValue.set(val);
    this.value.set(val);
    this.isOpen.set(true);
    this.highlightIndex.set(-1);
    this.changed.emit(val);
  }

  open(): void {
    this.isOpen.set(true);
  }

  closeDelayed(): void {
    setTimeout(() => this.isOpen.set(false), 150);
  }

  selectOption(opt: FilterOption): void {
    this.inputValue.set(opt.label);
    this.value.set(opt.value as string);
    this.isOpen.set(false);
    this.changed.emit(opt.value as string);
  }

  selectHighlighted(): void {
    const idx = this.highlightIndex();
    const filtered = this.filteredOptions();
    if (idx >= 0 && idx < filtered.length) {
      this.selectOption(filtered[idx]);
    }
  }

  highlightNext(): void {
    const max = this.filteredOptions().length - 1;
    this.highlightIndex.update((i) => Math.min(i + 1, max));
  }

  highlightPrev(): void {
    this.highlightIndex.update((i) => Math.max(i - 1, 0));
  }

  clear(): void {
    this.inputValue.set('');
    this.value.set('');
    this.isOpen.set(false);
    this.changed.emit('');
  }
}
