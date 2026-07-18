import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class GridSelectionState{
    readonly selectedRows = signal(0);
    readonly selectedId = signal<string | null>(null);
    readonly hasSelection = computed(()=>
                this.selectedRows() > 0)
}