import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name : 'Jobs',
    initialState : { Jobs : [] , limit : 0 , appliedFilters : {} , isFiltered : false},
    reducers : {
        setJobs(state , payload){
            let copy = state
            console.log(payload)
            let jobs = payload.payload.map((data => data))
            copy.Jobs = [
                ...copy.Jobs , ...jobs
            ]
            
           return copy
            
            
        },
        clearJobs(state){
            state.Jobs = []
            
           
        },
        applyFilter(state , payload){
            state.isFiltered = true
         state.Jobs = payload.payload
         console.log(state.Jobs);
        },
        limit(state , payload){
            state.limit = payload.payload
            console.log(state.limit);
        },
        filtersApplied(state , payload){
            
            state.appliedFilters[payload.payload.filterType] = payload.payload.value
            console.log(state.appliedFilters);
            
            
        },
        clearFilters(state){
            state.isFiltered = false
            state.appliedFilters  = {}
        }
    }
})

export default jobSlice;
export const jobSliceActions = jobSlice.actions