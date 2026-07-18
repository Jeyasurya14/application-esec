import { Component } from "@angular/core";
import { OrganizationByWeekContext } from "../definition/oraganization-by-week.context";
import { FrameworkGridComponent } from "../../../../../framework/grid";

@Component({
    selector:'license-organization-by-week',
    standalone:true,
    imports:[FrameworkGridComponent],
    templateUrl:'./organization-by-week.component.html',
    styleUrl:'./organization-by-week.component.scss'
})
export class OrganizationByWeekComponent{
    context = OrganizationByWeekContext
}