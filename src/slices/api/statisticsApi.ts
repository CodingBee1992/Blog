import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { FullStatsTypes } from '../../types/types'
const API_URL = import.meta.env.VITE_API_URL
const STATISTICS_URL = import.meta.env.VITE_STATISTICS_URL
import { EventSourcePolyfill } from 'event-source-polyfill'

import type { WritableDraft } from '@reduxjs/toolkit'

const statUpdaters: {
	[K in keyof FullStatsTypes]: (draft: WritableDraft<FullStatsTypes>, value: FullStatsTypes[K]) => void
} = {
	commentsStats: (d, v) => {
		d.commentsStats = v
	},
	usersStats: (d, v) => {
		d.usersStats = v
	},
	postsStats: (d, v) => {
		d.postsStats = v
	},
	likesStats: (d, v) => {
		d.likesStats = v
	},
	pageViews: (d, v) => {
		d.pageViews = v
	},

	chartStats: (d, v) => {
		d.chartStats = v
	},
	dayStats: (d, v) => {
		d.dayStats = v
	},

	topRated: (d, v) => {
		d.topRated = v
	},
	notifications: (d, v) => {
		d.notifications = v
	},
	latestComments: (d, v) => {
		d.latestComments = v
	},
}
function applyUpdate<K extends keyof FullStatsTypes>(
	draft: WritableDraft<FullStatsTypes>,
	key: K,
	value: FullStatsTypes[K],
) {
	statUpdaters[key](draft, value)
}

export const statisticApi = createApi({
	reducerPath: 'statisticApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`, credentials: 'include' }),

	endpoints: builder => ({
		incrementPageViews: builder.mutation({
			query: () => ({
				url: `${STATISTICS_URL}/page-views`,
				method: 'POST',
			}),
		}),
		incrementPostViews: builder.mutation({
			query: ({ postId }) => ({
				url: `${STATISTICS_URL}/post-views/${postId}`,
				method: 'POST',
			}),
		}),

		fetchStatisticsLive: builder.query<FullStatsTypes, number | void>({
			query: days => `${STATISTICS_URL}/stats?days=${days}`,

			async onCacheEntryAdded(days, { updateCachedData, cacheEntryRemoved, cacheDataLoaded }) {
				await cacheDataLoaded

				const es = new EventSourcePolyfill(`${API_URL}${STATISTICS_URL}/stream?days=${days}`, { withCredentials: true })

				es.onmessage = event => {
					try {
						const data = JSON.parse(event.data) as Partial<FullStatsTypes>

						updateCachedData(draft => {
							for (const key in data) {
								const typedKey = key as keyof FullStatsTypes
								const value = data[typedKey]

								if (value !== null && value !== undefined) {
									applyUpdate(draft, typedKey, value)
								}
							}
						})
					} catch (err) {
						console.log(err)
					}
				}
				await cacheEntryRemoved
				es.close()
			},
		}),
	}),
})

export const { useIncrementPageViewsMutation, useIncrementPostViewsMutation, useFetchStatisticsLiveQuery } =
	statisticApi
