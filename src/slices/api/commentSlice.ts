import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BASE_URL = import.meta.env.VITE_BASE_URL
const POSTS_URL = import.meta.env.VITE_POSTS_URL

export const commentSlice = createApi({
	reducerPath: 'comment',
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	endpoints: builder => ({
		fetchComments: builder.query({
			query: postId => `${POSTS_URL}/${postId}/comments`,
		}),
		createComment: builder.mutation({
			query: ({ postId, comData }) => ({
				url: `${POSTS_URL}/${postId}/comments`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: comData,
			}),
		}),
		updateComment: builder.mutation({
			query: ({ postId, data, commentId }) => ({
				url: `${POSTS_URL}/${postId}/comments/${commentId}`,
				method: 'PUT',
				headers: { 'Content-type': 'application/json' },
				body: data,
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
