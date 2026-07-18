import { inject, Injectable } from "@angular/core";
import { ContextMenuState } from "./context-menu.state";
import { ContextMenuItem } from "./context-menu.model";

@Injectable({
    providedIn:'root'
})

export class ContextMenuService{
    readonly state = inject(ContextMenuState);
    
    readonly opened = this.state.opened
    readonly x = this.state.x
    readonly y = this.state.y
    readonly items = this.state.items

    open(
        x:number,
        y:number,
        items: readonly ContextMenuItem[]):void
        {   
            console.log("Opening open()",x, y, items)
            this.state.x.set(x)
            this.state.y.set(y)
            this.state.items.set(items)
            this.state.opened.set(true)
        }
    
    close():void{
        this.state.opened.set(false)
    }
}