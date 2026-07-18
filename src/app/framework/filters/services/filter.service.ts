import { Injectable, signal } from "@angular/core";
import { WorkspaceFilterState } from "../models";

@Injectable({
    providedIn:'root'
})

export class FilterService{
    readonly state = signal(<WorkspaceFilterState>({}))

    set(
        tabId:string,
        filterId:string,
        value:unknown
    ):void{
        this.state.update(state =>{
            const workspaceFilter = state[tabId] ?? {};
            return{
                ...state,
                [tabId]:{
                    ...workspaceFilter,
                    [filterId]:value
                }
            }
        })

    }

    get(tabId:string){
        return this.state()[tabId] ?? {};
    }

    reset(tabId:string){
        this.state.update(state => ({
            ...state,
            [tabId]:{}
        }))
    }

    remove(
        tabId:string,
        filterId:string
    ):void{
        this.state.update(state => {
            const filters = {
                ...(state[tabId] ?? {})
            }

            delete filters[filterId];
            return{
                ...state,
                [tabId]:filters
            }
        })
    }
}