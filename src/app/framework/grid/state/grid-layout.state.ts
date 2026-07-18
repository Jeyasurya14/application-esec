import { computed, Injectable, signal } from "@angular/core";
import { ColumnState } from "ag-grid-community";

@Injectable({
    providedIn:'root'
})

export class GridLayoutState{
    private readonly columnsSignal = signal<ColumnState[]>([]);

    readonly columns = computed(()=> this.columnsSignal())

    save(
        columns:ColumnState[]
    ){
        this.columnsSignal.set(columns)
    }

    clear(){
        this.columnsSignal.set([])
    }
}