import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_URL = import.meta.env.VITE_API_URL
const POSTS_URL = import.meta.env.VITE_POSTS_URL
const SIGNATURE_URL = import.meta.env.VITE_SIGNATURE_URL

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`, credentials: 'include' }),
	endpoints: builder => ({
		
		fetchLimitPosts: builder.query({
			query: ({limit,page })=> {
				const params = new URLSearchParams()
				if(limit !== undefined) params.set('limit',limit)
				if(page !== undefined) params.set('page',page)
				
				return `${POSTS_URL}/limit/?${params.toString()}`
			},
		}),
		fetchPostCreatedAt: builder.query({
			query: postId => `${POSTS_URL}/createdAt/${postId}`,
		}),
		fetchPostsByLimit: builder.query({
			query: params => {
				

				const queryString = new URLSearchParams(
					Object.fromEntries(Object.entries(params).map(([k, v]) => [k,String(v)]))
				).toString()
				
				return `${POSTS_URL}/paginated/?${queryString}`
			},
		}),
		fetchPostById: builder.query({
			query: postId => `${POSTS_URL}/${postId}`,
		}),

		searchPost: builder.query({
			query: (query)=> `${POSTS_URL}/search/?query=${query}`
		}),

		createPost: builder.mutation({
			query: updatedData => ({
				url: `${POSTS_URL}`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: updatedData,
			}),
		}),
		updatePost: builder.mutation({
			query: ({postId,updatedData})=>({
				url: `${POSTS_URL}/update/${postId}`,
				method:'PUT',
				headers:{'Content-type':'application/json'},
				body:{updatedData}
			})
		}),

		deletePost:builder.mutation({
			query:(postId)=>({
				url:`${POSTS_URL}/delete/${postId}`,
				method:'DELETE',
				headers: { 'Content-type': 'application/json' },
			})
		}),

		publishPost:builder.mutation({
			query:(postId)=>({
				url:`${POSTS_URL}/publish-post/${postId}`,
				method:"PUT",
				headers:{'Content-type':'application/json'}
			})
		}),

		fetchCloudinary: builder.mutation({
			query: ({uploadFolder,publicId}) => ({
				url:`${SIGNATURE_URL}/?uploadFolder=${uploadFolder}&publicId=${publicId}`,
				method:"POST",
				headers:{'Content-type':'application/json'}
			})
		}),
		destroyCloudinaryImage: builder.mutation({
			query: (publicId)=>({
				url:`${SIGNATURE_URL}/destroy/?publicId=${publicId}`,
				method:'DELETE',
				headers:{'Content-type':'application/json'}
			})
		})
	}),
})

export const {
	useFetchLimitPostsQuery,
	useCreatePostMutation,
	useFetchPostByIdQuery,
	useFetchPostsByLimitQuery,
	useFetchPostCreatedAtQuery,
	useFetchCloudinaryMutation,
	useDeletePostMutation,
	usePublishPostMutation,
	useSearchPostQuery,
	useUpdatePostMutation,
	useDestroyCloudinaryImageMutation
} = apiSlice
