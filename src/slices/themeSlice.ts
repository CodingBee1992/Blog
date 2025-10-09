import {createSlice} from '@reduxjs/toolkit'

interface InitialProps {
    isLoading: boolean,
    isOpen:boolean
}

const initialState: InitialProps ={
    isLoading: false,
    isOpen:false,
}

export const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        setIsLoading:(state,action)=>{
            state.isLoading = action.payload
        },
        setIsOpen:(state,action)=>{
            state.isOpen = action.payload
        }
    }
})

export const {setIsLoading,setIsOpen} = themeSlice.actions