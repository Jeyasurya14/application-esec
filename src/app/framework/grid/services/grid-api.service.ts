import { Injectable } from "@angular/core";
import { GridApi } from "ag-grid-community";

@Injectable()
export class GridApiService{
    private api:GridApi | null = null;
    setApi(api:GridApi){
        this.api=api
    }
    getApi(){
        return this.api
    }
    refresh():void{
        this.api?.refreshServerSide();
    }
    deselectAll():void{
        this.api?.deselectAll()
    }
    clearSelection():void{
        this.api?.deselectAll()
    }
    autoSizeAllColumns():void{
        this.api?.autoSizeAllColumns();
    }
    sizeColumnsToFit():void{
        this.api?.sizeColumnsToFit()
    }
    exportCsv():void{
        this.api?.exportDataAsCsv()
    }
}