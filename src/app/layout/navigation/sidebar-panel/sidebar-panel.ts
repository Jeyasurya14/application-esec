import { Component, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';
import { WorkspaceService } from '../../../framework/workspace';
import { Screen } from '../../../core/models/screen.model';

@Component({
  selector: 'app-sidebar-panel',
  imports: [],
  templateUrl: './sidebar-panel.html',
  styleUrl: './sidebar-panel.scss',
  host: {
    '[class.is-open]': 'isOpen()',
    '[style.--panel-offset-top.px]': 'panelTop()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarPanel {
  private readonly sidebar = inject(SidebarService)
  private readonly workspace = inject(WorkspaceService)
  readonly filterText = signal('')
  readonly panelTop = this.sidebar.panelTop
  readonly isOpen = this.sidebar.panelOpened
  readonly module = this.sidebar.currentModule

  readonly title = computed(()=>{
    return this.module()?.title ?? ''
  })
  readonly icon = computed(()=>{
    return this.module()?.icon ?? ''
  })
  readonly description = computed(()=>{
    return this.module()?.description ?? ''
  })

  readonly placeholder = computed(()=>{
    const module = this.module()
    if(!module){
      return;
    }
    return `Filter ${module.title.toLowerCase()}`
  })

  readonly screens = this.sidebar.currentScreens;

  readonly filteredScreens = computed(()=>{
    const filter = this.filterText()
    .trim()
    .toLocaleLowerCase()
    const screens = this.screens()
    if(!filter){
      return screens;
    }
    return screens.filter(screen => screen.title.toLowerCase().includes(filter))
  })
  readonly selectedScreen = computed(()=>{
    return this.sidebar.selectedScreen();
  })
  selectScreen(screen:Screen):void{
    console.log('Click Screen :', screen)
     this.sidebar.selectScreen(screen.id);
     this.workspace.open(screen)
  }

  close(){
    this.filterText.set('')
    this.sidebar.closePanel()
  }
}
