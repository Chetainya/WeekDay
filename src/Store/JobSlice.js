import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name : 'Jobs',
    initialState : { Jobs : [] , limit : 0},
    reducers : {
        setJobs(state , payload){
            let copy = state
            
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
            
         state.Jobs = payload.payload
        },
        limit(state , payload){
            state.limit = payload.payload
            console.log(state.limit);
        }
    }
})

export default jobSlice;
export const jobSliceActions = jobSlice.actions