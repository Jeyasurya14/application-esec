import { inject, Injectable } from "@angular/core";
import { GridApiService } from "./grid-api.service";
import { GridStateService } from "./grid-state.service";
import { GridSelectionState } from "../state";
import { GridLayoutState } from "../state/grid-layout.state";

@Injectable({
    providedIn:'root'
})
export class GridService{
    private readonly api = inject(GridApiService);
    private readonly state = inject(GridStateService)
    private readonly selection = inject(GridSelectionState)
    private readonly layout = inject(GridLayoutState)

    refresh():void{
        this.state.setLoading(true)
        this.api.refresh()
    }
    finishLoading():void{
        this.state.setLoading(false)
    }
    setTotalRows(rows:number):void{
        this.state.setTotalRows(rows)
    }
    setSelectedRows(rows:number):void{
        this.state.setSelectedRows(rows)
    }
    setError(value:string | null){
        this.state.setError(value)
    }
    export():void{
        this.api.exportCsv()
    }
    autoFit():void{
        this.api.sizeColumnsToFit()
    }
    clearSelection():void{
        this.api.clearSelection()
    }
    saveLayout(){
        const api = this.api.getApi()
        if(!api){
            return;
        }
        this.layout.save(
            api.getColumnState()
        )
    }
    restoreLayout(){
        const api = this.api.getApi()

        if(!api){
            return;
        }
        api.applyColumnState(
            {
                state: 
                    this.layout.columns(),
                applyOrder:true
            }
        )
    }
    resetLayout(){
        const api = this.api.getApi();
        if(!api){
            return;
        }
        api.resetColumnState();
        this.layout.clear()
    }

}