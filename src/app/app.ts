import { Component, HostListener } from '@angular/core';
import { LayoutComponent } from './layout/layout';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [LayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  @HostListener('document:contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
}
}