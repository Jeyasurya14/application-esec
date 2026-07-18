import { Component } from "@angular/core";
import { agentWindowsContext } from "../definition";
import { FrameworkGridComponent } from "../../../../../framework/grid";

@Component({
    selector:'dashboard-agent-windows',
    standalone:true,
    imports: [FrameworkGridComponent],
    templateUrl:'./agent-windows.component.html',
    styleUrl:'./agent-windows.component.scss',
})

export class AgentWindowComponent{
    context = agentWindowsContext
}