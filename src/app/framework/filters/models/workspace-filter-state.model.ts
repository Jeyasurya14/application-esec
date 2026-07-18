import { FilterState } from "./filter-state.model";

export interface WorkspaceFilterState{
    [tabId: string]:FilterState
}