import { configureStore } from '@reduxjs/toolkit'
import { themeSlice } from './slices/themeSlice'
import { apiSlice } from './slices/api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { commentSlice } from './slices/api/commentSlice'
import { loginSlice } from './slices/api/loginSlice'
import { authSlice } from './slices/api/authSlice'

export const store = configureStore({
	reducer: {
		theme: themeSlice.reducer,
		auth:authSlice.reducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		[commentSlice.reducerPath]: commentSlice.reducer,
		[loginSlice.reducerPath]: loginSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware).concat(commentSlice.middleware).concat(loginSlice.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
