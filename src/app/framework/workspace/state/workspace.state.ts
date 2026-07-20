import { computed, Injectable, signal } from '@angular/core';
import { WorkspaceTab } from '../models/workspace.model';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceState {
  readonly tabs = signal(<WorkspaceTab[]>[]);
  readonly activeTabId = signal(<string | null>null);
  readonly tabSequence = signal(0);
  readonly activeTab = computed(() => {
    const id = this.activeTabId();
    if (!id) {
      return null;
    }
    return this.tabs().find((tab) => tab.id === id) ?? null;
  });
}

// It only stores:

// Open tabs
// Active tab
// Selected tab
// Workspace state
