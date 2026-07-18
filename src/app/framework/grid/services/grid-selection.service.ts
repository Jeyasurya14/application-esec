import { inject, Injectable } from "@angular/core";
import { GridStateService } from "./grid-state.service";

@Injectable()
export class GridSelectionService{
    private readonly state = inject(GridStateService)

    update(count:number):void{
        this.state.setSelectedRows(count)
    }
    clear():void{
        this.state.setSelectedRows(0)
    }
}