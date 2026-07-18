import { Component, ElementRef, inject } from '@angular/core';
import { MenuItems, MenuTextItem } from '../../../core/models/sidebar-item.model';
import { SidebarService } from '../../../core/services/sidebar.service';
import { Module } from '../../../core/models/module.model';
import { calculatePanelTop } from '../panel-position';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  readonly sidebar = inject(SidebarService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);


  menuTextItems: MenuTextItem[] = [
    { id: 1, char: 'B', title: 'Bentley' },
    { id: 2, char: 'S', title: 'Service' },
    { id: 3, char: 'L', title: 'Logs' },
    { id: 4, char: 'O', title: 'Opt File' },
    { id: 5, char: 'D', title: 'Denial' },
    { id: 6, char: 'E', title: 'Expiry' },
    { id: 7, char: 'C', title: 'Checkout' },
    { id: 8, char: 'F', title: 'Feature' },
    { id: 9, char: 'V', title: 'Vendor' },
  ];

  selectModule(module: Module, trigger: HTMLElement){
      const sidebarElement = this.elementRef.nativeElement.querySelector('.sidebar')
      if(!sidebarElement){
        return;
      }
      const panelTop = calculatePanelTop(
        trigger,
        sidebarElement
        );

        this.sidebar.selectModule(module.id, panelTop)

  }


}
