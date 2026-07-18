import { Injectable, signal } from "@angular/core";
import { ContextMenuItem } from "./context-menu.model";


@Injectable({
    providedIn:'root'
})

export class ContextMenuState{
    readonly opened = signal(false);
    readonly x = signal(0);
    readonly y = signal(0)
    readonly items = signal<readonly ContextMenuItem[]>([])
}