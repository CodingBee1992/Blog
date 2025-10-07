import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./slices/themeSlice";
import { apiSlice } from "./slices/api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
    reducer:{
        theme:themeSlice.reducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware)

})


setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>