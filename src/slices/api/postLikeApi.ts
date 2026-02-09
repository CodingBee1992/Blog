import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { EventSourcePolyfill } from 'event-source-polyfill'

const API_URL = import.meta.env.VITE_API_URL
const POSTLIKE_URL = import.meta.env.VITE_POSTLIKE_URL

export const postLikeApi = createApi({
	reducerPath: 'like',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`, credentials: 'include' }),
	tagTypes: ['PostLikes', 'UserLikedPost'],
	endpoints: builder => ({
		toogleLikePost: builder.mutation<void, string>({
			query: postId => ({
				url: `${POSTLIKE_URL}/${postId}`,
				method: 'POST',
			}),
			invalidatesTags: (_result, _error, postId) => [
				{ type: 'PostLikes', id: postId },
				{ type: 'UserLikedPost', id: postId },
			],
		}),
		fetchUserLikedPost: builder.query({
			query: ({ postId, userId }) => `${POSTLIKE_URL}/?postId=${postId}&userId=${userId}`,
			providesTags: (_result, _error, { postId }) => [{ type: 'UserLikedPost', id: postId }],
		}),

		fetchLivePostLikes: builder.query<number, string>({
			query: postId => `${POSTLIKE_URL}/postLikes?postId=${postId}`,

			async onCacheEntryAdded(postId, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
				await cacheDataLoaded

				const es = new EventSourcePolyfill(`${API_URL}${POSTLIKE_URL}/stream?postId=${postId}`, {
					withCredentials: true,
				})

				es.onmessage = event => {
					const incoming = JSON.parse(event.data)

					updateCachedData(() => incoming)
				}

				es.onerror = err => {
					console.warn('SSE error', err)
				}

				await cacheEntryRemoved
				es.close()
			},
		}),
	}),
})

export const { useToogleLikePostMutation, useFetchUserLikedPostQuery, useFetchLivePostLikesQuery } = postLikeApi
