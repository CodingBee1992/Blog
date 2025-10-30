import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./slices/themeSlice";
import { apiSlice } from "./slices/api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { commentSlice } from "./slices/api/commentSlice";


export const store = configureStore({
    reducer:{
        theme:themeSlice.reducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
        [commentSlice.reducerPath]:commentSlice.reducer
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware).concat(commentSlice.middleware)

})


setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>