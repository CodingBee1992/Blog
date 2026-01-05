import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
		fetchPostLikes: builder.query({
			query: postId => `${POSTLIKE_URL}/${postId}`,
			providesTags: (_result, _error, postId) => [{ type: 'PostLikes', id: postId }],
		}),
	}),
})

export const { useToogleLikePostMutation, useFetchUserLikedPostQuery, useFetchPostLikesQuery } = postLikeApi
