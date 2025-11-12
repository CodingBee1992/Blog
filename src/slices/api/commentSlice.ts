import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BASE_URL = import.meta.env.VITE_BASE_URL
const POSTS_URL = import.meta.env.VITE_POSTS_URL

export const commentSlice = createApi({
	reducerPath: 'comment',
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}`, credentials: 'include' }),
	endpoints: builder => ({
		fetchComments: builder.query({
			query: postId => `${POSTS_URL}/${postId}/comments`,
		}),
		createComment: builder.mutation({
			query: ({ postId, comment, parentId }) => ({
				url: `${POSTS_URL}/${postId}/comments`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: { comment, parentId },
			}),
		}),
		updateComment: builder.mutation({
			query: ({ postId, commentId, comment }) => ({
				url: `${POSTS_URL}/${postId}/comments/${commentId}`,
				method: 'PUT',
				headers: { 'Content-type': 'application/json' },
				body: {comment},
			}),
		}),
		deleteComment: builder.mutation({
			query: ({ postId, commentId }) => ({
				url: `${POSTS_URL}/${postId}/comments/${commentId}`,
				method: 'DELETE',
				headers: { 'Content-type': 'application/json' },
			}),
		}),
	}),
})

export const { useCreateCommentMutation, useFetchCommentsQuery, useUpdateCommentMutation, useDeleteCommentMutation } =
	commentSlice
