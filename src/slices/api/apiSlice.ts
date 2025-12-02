import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_URL = import.meta.env.VITE_API_URL
const POSTS_URL = import.meta.env.VITE_POSTS_URL
const SIGNATURE_URL = import.meta.env.VITE_SIGNATURE_URL

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`, credentials: 'include' }),
	endpoints: builder => ({
		fetchLimitPosts: builder.query({
			query: limit => `${POSTS_URL}/limit/?limit=${limit}`,
		}),
		fetchPostCreatedAt: builder.query({
			query: postId => `${POSTS_URL}/createdAt/${postId}`,
		}),
		fetchPostsByLimit: builder.query({
			query: params => {
				// const params = new URLSearchParams()

				// if(limit) params.append('limit',limit)
				// if(page) params.append('page',page)
				// if(search) params.append('search',search)
				// if(sortBy) params.append('sortBy',sortBy)
				// if(order) params.append('order',order)
				// if(category) params.append('category',category)

				//    return `${POSTS_URL}/paginated/?limit=${limit}&page=${page}&search=${search}&sortBy=${sortBy}&category=${category}&order=${order}`

				// return `${POSTS_URL}/paginated/?${params.toString()}`

				const queryString = new URLSearchParams(
					Object.fromEntries(Object.entries(params).map(([k, v]) => [k,String(v)]))
				).toString()

				return `${POSTS_URL}/paginated/?${queryString}`
			},
		}),
		fetchPostById: builder.query({
			query: postId => `${POSTS_URL}/${postId}`,
		}),

		createPost: builder.mutation({
			query: updatedData => ({
				url: `${POSTS_URL}`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: updatedData,
			}),
		}),
		fetchCloudinary: builder.query({
			query: () => `${SIGNATURE_URL}`,
		}),
	}),
})

export const {
	useFetchLimitPostsQuery,
	useCreatePostMutation,
	useFetchPostByIdQuery,
	useFetchPostsByLimitQuery,
	useFetchPostCreatedAtQuery,
	useFetchCloudinaryQuery,
} = apiSlice
