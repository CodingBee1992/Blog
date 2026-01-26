import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ArticleContentProps } from '../../types/types'
const API_URL = import.meta.env.VITE_API_URL
const POSTS_URL = import.meta.env.VITE_POSTS_URL
// const SIGNATURE_URL = import.meta.env.VITE_SIGNATURE_URL

type FetchPostsParams = {
	page?: number
	limit?: number
}

type FetchPostsResponse = {
	posts: ArticleContentProps[]
	totalPages: number
}

export const postApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`, credentials: 'include' }),
	tagTypes: ['POSTS'],
	endpoints: builder => ({
		fetchLimitPosts: builder.query({
			query: ({ limit, page }) => {
				const params = new URLSearchParams()
				if (limit !== undefined) params.set('limit', limit)
				if (page !== undefined) params.set('page', page)

				return `${POSTS_URL}/limit/?${params.toString()}`
			},
			providesTags: () => [{ type: 'POSTS' }],
		}),
		fetchPostCreatedAt: builder.query({
			query: postId => `${POSTS_URL}/createdAt/${postId}`,
			providesTags: () => [{ type: 'POSTS' }],
		}),
		fetchPostsByLimit: builder.query<FetchPostsResponse, FetchPostsParams>({
			query: params => {
				const queryString = new URLSearchParams(
					Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
				).toString()

				return `${POSTS_URL}/paginated/?${queryString}`
			},
			providesTags: () => [{ type: 'POSTS' }],
		}),
		fetchPostsByCategory: builder.query({
			query: params => {
				const queryString = new URLSearchParams(
					Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
				).toString()

				return `${POSTS_URL}/paginated/?${queryString}`
			},
			providesTags: () => [{ type: 'POSTS' }],
		}),
		fetchPostById: builder.query({
			query: postId => `${POSTS_URL}/${postId}`,
			providesTags: () => [{ type: 'POSTS' }],
		}),

		searchPost: builder.query({
			query: query => `${POSTS_URL}/search/?query=${query}`,
		}),

		createPost: builder.mutation({
			query: updatedData => ({
				url: `${POSTS_URL}`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: updatedData,
			}),
			invalidatesTags: () => [{ type: 'POSTS' }],
		}),
		updatePost: builder.mutation({
			query: ({ postId, updatedData }) => ({
				url: `${POSTS_URL}/update/${postId}`,
				method: 'PUT',
				headers: { 'Content-type': 'application/json' },
				body: { updatedData },
			}),
			invalidatesTags: () => [{ type: 'POSTS' }],
		}),

		deletePost: builder.mutation({
			query: postId => ({
				url: `${POSTS_URL}/delete/${postId}`,
				method: 'DELETE',
				headers: { 'Content-type': 'application/json' },
			}),
			invalidatesTags: () => [{ type: 'POSTS' }],
		}),

		publishPost: builder.mutation({
			query: postId => ({
				url: `${POSTS_URL}/publish-post/${postId}`,
				method: 'PUT',
				headers: { 'Content-type': 'application/json' },
			}),
			invalidatesTags: () => [{ type: 'POSTS' }],
		}),

		// fetchCloudinary: builder.mutation({
		// 	query: ({uploadFolder,publicId}) => ({
		// 		url:`${SIGNATURE_URL}/?uploadFolder=${uploadFolder}&publicId=${publicId}`,
		// 		method:"POST",
		// 		headers:{'Content-type':'application/json'}
		// 	})
		// }),
		// destroyCloudinaryImage: builder.mutation({
		// 	query: (publicId)=>({
		// 		url:`${SIGNATURE_URL}/destroy/?publicId=${publicId}`,
		// 		method:'DELETE',
		// 		headers:{'Content-type':'application/json'}
		// 	})
		// })
	}),
})

export const {
	useFetchLimitPostsQuery,
	useCreatePostMutation,
	useFetchPostByIdQuery,
	useFetchPostsByLimitQuery,
	useFetchPostCreatedAtQuery,
	// useFetchCloudinaryMutation,
	useDeletePostMutation,
	usePublishPostMutation,
	useSearchPostQuery,
	useUpdatePostMutation,
	useFetchPostsByCategoryQuery,
	// useDestroyCloudinaryImageMutation
} = postApi
