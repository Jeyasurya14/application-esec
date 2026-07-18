import { inject, Injectable } from '@angular/core';
import { GridApiService } from './grid-api.service';
import { ColumnState } from 'ag-grid-community';

const STORAGE_PREFIX = 'esms_grid_layout_';

@Injectable({
  providedIn: 'root',
})
export class GridLayoutService {
  private readonly api = inject(GridApiService);

  save(key?: string): void {
    const api = this.api.getApi();
    if (!api) return;
    const state = api.getColumnState();
    if (key) {
      try {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(state));
      } catch {}
    }
  }

  restore(key?: string): void {
    const api = this.api.getApi();
    if (!api) return;
    if (key) {
      try {
        const raw = localStorage.getItem(STORAGE_PREFIX + key);
        if (raw) {
          const state: ColumnState[] = JSON.parse(raw);
          api.applyColumnState({ state, applyOrder: true });
          return;
        }
      } catch {}
    }
    api.resetColumnState();
  }

  reset(key?: string): void {
    const api = this.api.getApi();
    if (!api) return;
    api.resetColumnState();
    if (key) {
      try {
        localStorage.removeItem(STORAGE_PREFIX + key);
      } catch {}
    }
  }
}
