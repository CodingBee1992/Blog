import {createSlice} from '@reduxjs/toolkit'

interface InitialProps {
    isLoading: boolean
}

const initialState: InitialProps ={
    isLoading: false
}

export const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        setIsLoading:(state,action)=>{
            state.isLoading = action.payload
        }
    }
})

export const {setIsLoading} = themeSlice.actions