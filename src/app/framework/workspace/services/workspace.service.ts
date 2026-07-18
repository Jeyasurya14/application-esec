import { computed, inject, Injectable } from "@angular/core"
import { WorkspaceState } from "../state/workspace.state"
import { Screen } from "../../../core/models/screen.model"
import { WorkspaceTab } from "../models/workspace.model"
@Injectable({
    providedIn:'root'
})

export class WorkspaceService{
    private readonly state = inject(WorkspaceState)
    
    readonly tabs = computed(()=> this.state.tabs())
    readonly hasTabs = computed(() => this.state.tabs().length > 0)
    readonly activeTab = computed(()=> this.state.activeTab())

    open(screen: Screen){
        const existingTab = this.state.tabs().find(tab => tab.screen.id === screen.id)
        if(existingTab){
            this.activate(existingTab.id);
            return;
        }
        const newId = this.state.tabSequeance()+1;
        this.state.tabSequeance.set(newId);

        const tab: WorkspaceTab ={
            id:`ws-${newId}`,
            screen,
            icon:screen.icon,
            title:screen.title,
            sidebar_title:screen.sidebar_title,
            active:true,
            pinned:false,
            closable:true,
            dirty:false,
            state:{}
        }
        const tabs = this.state.tabs().map(tab => ({
            ...tab,
            active:false
        }))
        this.state.tabs.set([
            tab,
            ...tabs
        ])
        this.state.activeTabId.set(tab.id)
    }
    activate(tabId:string):void{
        this.state.tabs.update(tabs => tabs.map(tab => ({...tab, active: tab.id === tabId})))
        this.state.activeTabId.set(tabId)
    }
    close(tabId:string):void{
        const tabs = this.state.tabs().filter(tab => tab.id !== tabId)
        this.state.tabs.set(tabs);

        if(!tabs.length){
            this.state.activeTabId.set(null)
            return;
        }
        const active = tabs[tabs.length - 1];
        this.activate(active.id)
    }

    closeOtherTabs(tabId:string):void{
        const tabs = this.state.tabs().filter(tab => tab.id === tabId)
        this.state.tabs.set(tabs)
        if(!tabs.length){
            return;
        }
        const active = tabs[tabs.length] 
        this.activate(active.id)
    }


    duplicate(tabId:string):void{
        const source = this.state.tabs().find(tab => tab.id === tabId)

        if(!source){
            return;
        }
        const nextId = this.state.tabSequeance()+1;
        this.state.tabSequeance.set(nextId);

        const duplicate: WorkspaceTab = {
            ...source,
            id:`ws-${nextId}`,
            active:true,
            state: structuredClone(source.state ?? {})
        }
        const tabs = this.state.tabs().map(tab =>({...tab, active:false}) )
        this.state.tabs.set([...tabs, duplicate])
        this.state.activeTabId.set(duplicate.id)
    }

    reorder(previousIndex:number, currentIndex:number):void{
        if(previousIndex === currentIndex){
            return;
        }
        this.state.tabs.update(
            tabs => {
                const reordered = [...tabs];
                const [moved] = reordered.splice(previousIndex,1)
                reordered.splice(currentIndex,0,moved)
                return reordered;
            }
        )
    }

    pin(tabId:string):void{
        this.state.tabs.update(tabs => {
            const updated = tabs.map( tab =>{
                if(tab.id === tabId){
                    return{
                        ...tab,
                        pinned: !tab.pinned
                    }
                }
                return tab;
            })
            const pinned = updated.filter(tab=> tab.pinned)
            const normal = updated.filter(tab => !tab.pinned)

            return[
                ...pinned,
                ...normal
            ]
        })
    }
}