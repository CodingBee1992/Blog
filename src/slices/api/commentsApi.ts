import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_URL = import.meta.env.VITE_API_URL
const COMMENTS_URL = import.meta.env.VITE_COMMENTS_URL

export const commentsApi = createApi({
	reducerPath: 'comment',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`, credentials: 'include' }),
	endpoints: builder => ({
		fetchComments: builder.query({
			query: postId => `${COMMENTS_URL}/${postId}`,
		}),
		createComment: builder.mutation({
			query: ({ postId, comment, parentId }) => ({
				url: `${COMMENTS_URL}/${postId}`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: { comment, parentId },
			}),
		}),
		updateComment: builder.mutation({
			query: ({ commentId, comment }) => ({
				url: `${COMMENTS_URL}/${commentId}`,
				method: 'PUT',
				headers: { 'Content-type': 'application/json' },
				body: { comment },
			}),
		}),
		deleteComment: builder.mutation({
			query: ({ commentId }) => ({
				url: `${COMMENTS_URL}/${commentId}`,
				method: 'DELETE',
				headers: { 'Content-type': 'application/json' },
			}),
		}),

		fetchAllComments: builder.query({
			
			query: params => {
				const queryString = new URLSearchParams(
					Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
				).toString()
				
				return `${COMMENTS_URL}/?${queryString}`
			},
		}),
	}),
})

export const {
	useCreateCommentMutation,
	useFetchCommentsQuery,
	useUpdateCommentMutation,
	useDeleteCommentMutation,
	useFetchAllCommentsQuery,
} = commentsApi
