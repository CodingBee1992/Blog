import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CategoryProps } from '../../types/types'

const API_URL = import.meta.env.VITE_API_URL
const CATEGORY_URL = import.meta.env.VITE_CATEGORY_URL

export const categoryApi = createApi({                                          
	reducerPath: 'cat',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`, credentials: 'include' }),
	tagTypes: ['CreateCategory', 'DeleteCategory'],
	endpoints: builder => ({
		createCategory: builder.mutation<{message:string},{name:string,slug:string}>({
			query: ({ name, slug }) => ({
				url: `${CATEGORY_URL}`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: { name, slug },
			}),
			invalidatesTags: () => [{ type: 'CreateCategory' }],
		}),
		fetchAllCategories: builder.query<CategoryProps[],void>({
			query: () => `${CATEGORY_URL}`,
			providesTags: () => [{ type: 'CreateCategory' }, { type: 'DeleteCategory' }],
		}),

		deleteCategory: builder.mutation<void,string>({
			query: categoryId => ({
				url: `${CATEGORY_URL}/${categoryId}`,
				method: 'DELETE',
			}),
			invalidatesTags: () => [{ type: 'DeleteCategory'}],
		}),
	}),
})

export const { useCreateCategoryMutation, useFetchAllCategoriesQuery, useDeleteCategoryMutation } = categoryApi
