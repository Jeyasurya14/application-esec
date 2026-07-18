import { CommonModule } from "@angular/common";
import { Component, inject, input } from "@angular/core";
import { GridToolbar } from "../../models";
import { GridService } from "../../services";


@Component({
    selector:'framework-grid-toolbar',
    standalone:true,
    imports:[CommonModule],
    templateUrl:'./grid-toolbar.component.html',
    styleUrl:'./grid-toolbar.component.scss'
})

export class GridToolbarComponent{
    readonly toolbar = input.required<GridToolbar>();
    private readonly grid = inject(GridService)

    execute(id:string):void{
        switch(id){
            case 'refresh':
                this.grid.refresh();
                break;
            case 'export':
                this.grid.export();
                break;
            case 'autofit':
                this.grid.autoFit();
                break;
            case 'clear-selection':
                this.grid.clearSelection()
                break;
            default:
                console.warn(
                    `unknown toolbar action: ${id}`
                )
        }
    }
}