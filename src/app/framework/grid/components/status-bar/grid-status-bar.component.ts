import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { GridStateService } from "../../services/grid-state.service";

@Component({
    selector:'framework-grid-status-bar',
    standalone:true,
    imports:[
        CommonModule
    ],
    templateUrl:'./grid-status-bar.component.html',
    styleUrl:'./grid-status-bar.component.scss'
})

export class GridStatusBarComponent{
    readonly state = inject(GridStateService)
}