import { computed, inject, Injectable } from "@angular/core";
import { ModuleRegistry } from "../registry/module.registry";
import { SidebarState } from "../state/sidebar.state";
import { Module } from "../models/module.model";
import { Screen } from "../models/screen.model";

@Injectable({
  providedIn:'root',
})

export class SidebarService{
  
  private readonly registry = inject(ModuleRegistry);
  private readonly state = inject(SidebarState)

  readonly modules = computed(()=>{
    return this.registry.getModules()
  })

  readonly panelTop = computed(()=>{
    return this.state.panelTop()
  })

  readonly screens = computed<readonly Screen[]>(()=>{
    const moduleId = this.state.selectedModule();
    if(!moduleId){
      return [];
    }
    return this.registry.getScreens(moduleId);
  })

  readonly currentModule = computed<Module | null>(()=>{
    const id = this.state.selectedModule()
    if(!id){
      return null;
    }
    return this.registry.getModule(id) ?? null;
})

  readonly currentScreens = computed<readonly Screen[]>(()=>{
    const id = this.state.selectedModule()
    if(!id){
      return [];
    }
    return this.registry.getScreens(id);
  })


  readonly selectedModule = computed(()=>{
    return this.state.selectedModule()
  })


  readonly selectedScreen = computed(()=>{
    return this.state.selectedScreen()
  })


  readonly panelOpened = computed(()=>{
    return this.state.panelOpened()
  })
  selectModule(moduleId:string, top:number):void{
     this.state.selectModule(moduleId, top)
  }

  selectScreen(screenId:string):void{
     this.state.selectScreen(screenId);
  }

  openPanel(top:number):void{
     this.state.openPanel(top)
  }
  closePanel():void{
     this.state.closePanel();
  }

  togglePanel(top:number):void{
    this.state.togglePanel(top)
  }

}