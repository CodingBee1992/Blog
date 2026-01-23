import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CommentsDataProps } from '../../types/types'
const API_URL = import.meta.env.VITE_API_URL
const COMMENTS_URL = import.meta.env.VITE_COMMENTS_URL


export const commentsApi = createApi({
	reducerPath: 'comment',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`, credentials: 'include' }),
	tagTypes: ['Create', 'Delete'],
	endpoints: builder => ({
		
		fetchLiveComments: builder.query<CommentsDataProps[], string>({
			queryFn: ()=>({data: []}),

			async onCacheEntryAdded(postId, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
				await cacheDataLoaded

				const es = new EventSource(`${API_URL}${COMMENTS_URL}/stream?postId=${postId}`)

				es.onmessage = event => {
					const comment = JSON.parse(event.data)

					updateCachedData(() => {
						return comment
					})
				}
				await cacheEntryRemoved
				es.onerror = err => {
					console.error('SSE error:', err)
					es.close()
				}
			},
		}),
		createComment: builder.mutation({
			query: ({ postId, comment, parentId }) => ({
				url: `${COMMENTS_URL}/${postId}`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: { comment, parentId },
			}),
			invalidatesTags: (_result, _error, { postId }) => [{ type: 'Create', id: postId }],
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
			invalidatesTags: (_result, _error, { commentId }) => [{ type: 'Delete', id: commentId }],
		}),

		fetchAllComments: builder.query({
			query: params => {
				const queryString = new URLSearchParams(
					Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
				).toString()

				return `${COMMENTS_URL}/?${queryString}`
			},
		}),
	}),
})

export const {
	useCreateCommentMutation,
	// useFetchCommentsQuery,
	useUpdateCommentMutation,
	useDeleteCommentMutation,
	useFetchAllCommentsQuery,
	useFetchLiveCommentsQuery,
} = commentsApi
