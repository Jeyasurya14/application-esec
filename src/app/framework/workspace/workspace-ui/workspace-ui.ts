import { AfterViewInit, Component, effect, ElementRef, inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { WorkspaceService } from '../services/workspace.service';
import { WorkspaceHost } from '../workspace-host/workspace-host';
import { CommonModule } from '@angular/common';
import { TabStrip } from '../../../framework/tab-strip/tab-strip.component';
import { ContextMenuService } from '../../../framework/context-menu/context-menu.service';
@Component({
  selector: 'app-workspace-ui',
  standalone: true,
  imports: [CommonModule, WorkspaceHost, TabStrip],
  templateUrl: './workspace-ui.html',
  styleUrl: './workspace-ui.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceUi {
  readonly workspace = inject(WorkspaceService);
  readonly contextMenu = inject(ContextMenuService);

  private dragIndex = -1;
  dragStart(index: number) {
    this.dragIndex = index;
  }

  drop(targetIndex: number) {
    if (this.dragIndex === -1) {
      return;
    }
    this.workspace.reorder(this.dragIndex, targetIndex);

    this.dragIndex = -1;
  }

  activate(tabId: string): void {
    this.workspace.activate(tabId);
  }
  close(tabId: string) {
    this.workspace.close(tabId);
  }
  duplicate(tabId: string) {
    this.workspace.duplicate(tabId);
  }
  closeOtherTabs(tabId: string) {
    this.workspace.closeOtherTabs(tabId);
  }

  openContextMenu(event: { event: MouseEvent; id: string }): void {
    event.event.preventDefault();
    console.log('Right click detected', event);
    const tab = this.workspace.tabs().find((tab) => tab.id === event.id);
    if (!tab) {
      return;
    }
    this.contextMenu.open(event.event.clientX, event.event.clientY, [
      {
        id: 'close',
        text: 'Close',
        icon: 'bi bi-x',
        action: () => this.workspace.close(tab.id),
      },
      {
        id: 'duplicate',
        text: 'Duplicate',
        icon: 'bi bi-files',
        action: () => this.workspace.duplicate(tab.id),
      },
      {
        id: 'close other',
        text: 'Close Other Tabs',
        icon: 'bi bi-file',
        action: () => this.workspace.closeOtherTabs(tab.id),
      },
      {
        id: 'Pin / Unpin',
        text: tab.pinned ? 'Unpin' : 'Pin',
        icon: tab.pinned ? 'bi bi-pin-angle-fill' : 'bi bi-pin-angle',
        action: () => this.workspace.pin(tab.id),
      },
    ]);
  }
}
