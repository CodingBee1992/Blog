import { configureStore } from '@reduxjs/toolkit'
import { themeSlice } from './slices/themeSlice'
import { postApi } from './slices/api/postApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { commentsApi } from './slices/api/commentsApi'
import { userApi } from './slices/api/userApi'
import { authSlice } from './slices/authSlice'
import { statisticApi } from './slices/api/statisticsApi'
import { postLikeApi } from './slices/api/postLikeApi'
import { categoryApi } from './slices/api/categoriesApi'
import { cloudinaryApi } from './slices/api/cloudinaryApi'

export const store = configureStore({
	reducer: {
		theme: themeSlice.reducer,
		auth: authSlice.reducer,
		[postApi.reducerPath]: postApi.reducer,
		[commentsApi.reducerPath]: commentsApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[statisticApi.reducerPath]: statisticApi.reducer,
		[postLikeApi.reducerPath]:postLikeApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
		[cloudinaryApi.reducerPath]:cloudinaryApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(postApi.middleware)
			.concat(commentsApi.middleware)
			.concat(userApi.middleware)
			.concat(statisticApi.middleware)
			.concat(postLikeApi.middleware)
			.concat(categoryApi.middleware)
			.concat(cloudinaryApi.middleware),
			
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
