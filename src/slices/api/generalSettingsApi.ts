import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const GENERAL_URL = import.meta.env.VITE_GENERAL_URL
const API_URL = import.meta.env.VITE_API_URL
export const generalApi = createApi({
	reducerPath: 'general',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`, credentials: 'include' }),
	tagTypes: ['SAVE'],
	endpoints: builder => ({
		saveGeneralSettings: builder.mutation({
			query: ({ general }) => ({
				url: `${GENERAL_URL}`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: { general },
			}),
			invalidatesTags: () => [{ type: 'SAVE' }],
		}),
		updateSecuritySettings: builder.mutation({
			query: ({ security }) => ({
				url: `${GENERAL_URL}/update/security`,
				method: 'PATCH',
				headers: { 'Content-type': 'application/json' },
				body: { security },
			}),
			invalidatesTags: () => [{ type: 'SAVE' }],
		}),
		updateCommentsSettings: builder.mutation({
			query: ({ comments }) => ({
				url: `${GENERAL_URL}/update/comments`,
				method: 'PATCH',
				headers: { 'Content-type': 'application/json' },
				body: { comments },
			}),
			invalidatesTags: () => [{ type: 'SAVE' }],
		}),
		updateBlogSettings: builder.mutation({
			query: ({ blog }) => ({
				url: `${GENERAL_URL}/update/blog`,
				method: 'PATCH',
				headers: { 'Content-type': 'application/json' },
				body: { blog },
			}),
			invalidatesTags: () => [{ type: 'SAVE' }],
		}),
		updateAnalyticsSettings: builder.mutation({
			query: ({ analytics }) => ({
				url: `${GENERAL_URL}/update/analytics`,
				method: 'PATCH',
				headers: { 'Content-type': 'application/json' },
				body: { analytics },
			}),
			invalidatesTags: () => [{ type: 'SAVE' }],
		}),
		updateDifferentSettings: builder.mutation({
			query: ({ different }) => ({
				url: `${GENERAL_URL}/update/different`,
				method: 'PATCH',
				headers: { 'Content-type': 'application/json' },
				body: { different },
			}),
			invalidatesTags: () => [{ type: 'SAVE' }],
		}),
		fetchSettings: builder.query({
			query: () => `${GENERAL_URL}`,
			providesTags: () => [{ type: 'SAVE' }],
		}),
	}),
})

export const {
	useSaveGeneralSettingsMutation,
	useFetchSettingsQuery,
	useUpdateSecuritySettingsMutation,
	useUpdateCommentsSettingsMutation,
	useUpdateBlogSettingsMutation,
	useUpdateAnalyticsSettingsMutation,
	useUpdateDifferentSettingsMutation
} = generalApi
