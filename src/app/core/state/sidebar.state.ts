import { Injectable, signal } from "@angular/core";


@Injectable({
    providedIn:'root',
})

export class SidebarState{
    readonly selectedModule = signal<string | null>(null);
    readonly selectedScreen = signal<string | null>(null);
    readonly panelOpened = signal(false);
    readonly panelTop = signal(0);

    selectModule(moduleId: string, top:number):void{
        this.selectedModule.set(moduleId);
        this.selectedScreen.set(null);
        this.panelTop.set(top);
        this.panelOpened.set(true);
    }

    selectScreen(screenId:string): void{
        this.selectedScreen.set(screenId);
    }

    openPanel(top:number):void{
        this.panelTop.set(top)
        this.panelOpened.set(true);
    }
    closePanel():void{
        this.panelOpened.set(false);
    }

    togglePanel(top:number):void{
        this.panelTop.set(top);
        this.panelOpened.update(open => !open);
    }
}