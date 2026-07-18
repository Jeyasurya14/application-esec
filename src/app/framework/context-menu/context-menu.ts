import { Component, ElementRef, HostListener, inject, Injectable } from "@angular/core";
import { ContextMenuService } from "./context-menu.service";
import { CommonModule } from "@angular/common";
import { ContextMenuItem } from "./context-menu.model";


@Injectable({
    providedIn:'root'
})
@Component({
    selector:'app-context-menu',
    standalone: true,
    imports:[CommonModule],
    templateUrl:'./context-menu.html',
    styleUrl:'./context-menu.scss',
    host:{
       '[style.left.px]':'menu.x()',
       '[style.top.px]':'menu.y()',
       '[class.open]':'menu.opened()'
    }
})

export class ContextMenu{
    readonly menu = inject(ContextMenuService)
    private readonly elementRef = inject(ElementRef<HTMLElement>)
    @HostListener('document:click',['$event'])
        onDocumentClick(event: MouseEvent):void{
            if(!this.menu.opened()){
                return;
            }
            const target = event.target as Node
            if(this.elementRef.nativeElement.contains(target)){
                return;
            }
            this.menu.close()
        }
    execute(item:ContextMenuItem){
        item.action?.()
        this.menu.close()
    }
}