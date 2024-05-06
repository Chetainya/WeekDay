import {configureStore} from '@reduxjs/toolkit'
import jobSlice from './JobSlice'


const Store = configureStore({
    reducer : {
        jobs : jobSlice.reducer
    }
})

export default Store