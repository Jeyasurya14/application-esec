import { Component, input, output, model } from '@angular/core';

@Component({
  selector: 'filter-tag',
  standalone: true,
  template: `
    <div class="tag-filter" [style.width.px]="width()">
      @if (label()) {
        <label class="tag-filter__label">{{ label() }}</label>
      }
      <div class="tag-filter__input-wrap">
        <input
          #tagInput
          type="text"
          class="tag-filter__input"
          [placeholder]="placeholder() || 'Type and press Enter...'"
          (keydown.enter)="addTag($event)"
          [disabled]="disabled()"
        />
        @if (tags().length > 0) {
          <span class="tag-filter__count">{{ tags().length }}</span>
        }
      </div>
      @if (tags().length > 0) {
        <div class="tag-filter__tags">
          @for (tag of tags(); track tag) {
            <span class="tag-filter__tag">
              {{ tag }}
              <button class="tag-filter__remove" (click)="removeTag(tag)" title="Remove {{ tag }}">
                &times;
              </button>
            </span>
          }
          <button class="tag-filter__clear-all" (click)="clearAll()" title="Clear all tags">
            Clear all
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .tag-filter {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 200px;
      }
      .tag-filter__label {
        font-size: 11px;
        font-weight: 500;
        color: #6b7280;
        padding-left: 2px;
      }
      .tag-filter__input-wrap {
        position: relative;
        display: flex;
      }
      .tag-filter__input {
        flex: 1;
        height: 32px;
        padding: 0 32px 0 10px;
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
      .tag-filter__input:hover {
        border-color: #b0b8c4;
      }
      .tag-filter__input:focus {
        border-color: #2b78ff;
        box-shadow: 0 0 0 2px rgba(43, 120, 255, 0.12);
      }
      .tag-filter__input::placeholder {
        color: #9ca3af;
      }
      .tag-filter__count {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10px;
        color: #fff;
        background: #2b78ff;
        padding: 1px 5px;
        border-radius: 8px;
        line-height: 1.4;
      }
      .tag-filter__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: 4px;
      }
      .tag-filter__tag {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        padding: 2px 8px;
        background: #eff6ff;
        border: 1px solid #bfdbfe;
        border-radius: 4px;
        font-size: 12px;
        color: #1e40af;
      }
      .tag-filter__remove {
        border: none;
        background: transparent;
        cursor: pointer;
        font-size: 14px;
        color: #1e40af;
        padding: 0;
        line-height: 1;
        opacity: 0.6;
        transition: opacity 120ms ease;
      }
      .tag-filter__remove:hover {
        opacity: 1;
      }
      .tag-filter__clear-all {
        border: none;
        background: transparent;
        font-size: 11px;
        color: #9ca3af;
        cursor: pointer;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: inherit;
        transition: all 120ms ease;
      }
      .tag-filter__clear-all:hover {
        color: #ef4444;
        background: #fef2f2;
      }
    `,
  ],
})
export class TagFilterComponent {
  readonly tags = model<string[]>([]);
  readonly label = input<string>();
  readonly placeholder = input<string>();
  readonly width = input(200);
  readonly disabled = input(false);
  readonly changed = output<string[]>();

  addTag(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.value.trim();
    if (!val || this.tags().includes(val)) return;
    const updated = [...this.tags(), val];
    this.tags.set(updated);
    this.changed.emit(updated);
    input.value = '';
  }

  removeTag(tag: string): void {
    const updated = this.tags().filter((t) => t !== tag);
    this.tags.set(updated);
    this.changed.emit(updated);
  }

  clearAll(): void {
    this.tags.set([]);
    this.changed.emit([]);
  }
}
