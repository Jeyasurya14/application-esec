import { computed, Injectable, signal } from "@angular/core";

@Injectable(
    {
        providedIn:'root'
    }
)

export class GridStateService{
    private readonly loadingSignal = signal(false);
    private readonly selectedRowsSignal = signal<number>(0);
    private readonly totalRowsSignal = signal<number>(0);
    private readonly errorSignal = signal<string | null>(null);


    readonly error = computed(
        ()=>this.errorSignal()
    )
    readonly loading = computed(
        ()=> this.loadingSignal()
    )
    readonly selectedRows = computed(
        ()=> this.selectedRowsSignal()
    )
    readonly totalRows = computed(
        ()=> this.totalRowsSignal()
    )

    setLoading(
        value:boolean
    ){
        this.loadingSignal.set(value)
    }
    setSelectedRows(
        rows:number
    ){
        this.selectedRowsSignal.set(rows)
    }
    setTotalRows(
        rows:number
    ){
        this.totalRowsSignal.set(rows)
    }
    setError(
        value:string | null
    ){
        this.errorSignal.set(value)
    }


}