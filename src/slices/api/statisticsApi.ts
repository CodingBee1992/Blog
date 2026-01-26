import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { FullStatsTypes, Stat } from '../../types/types'
const API_URL = import.meta.env.VITE_API_URL
const STATISTICS_URL = import.meta.env.VITE_STATISTICS_URL
import { EventSourcePolyfill } from 'event-source-polyfill'

const emptyStat: Stat = {
	total: 0,
	lastSeven: 0,
	lastThirty: 0,
	growthSeven: 0,
	growthThirty: 0,
}

const emptyTopRated = {
	categories: ['undefined'],
	postId: '',
	title: 'Unknown',
	totalViews: 0,
	commentsCount: 0,
	postlikes: 0,
	image: '/',
	seo: {
		slug: '/',
		metaDescription: '',
		metaTitle: '',
	},
}

const emptyFullStats: FullStatsTypes = {
	commentsStats: emptyStat,
	postsStats: emptyStat,
	usersStats: emptyStat,
	likesStats: emptyStat,
	pageViews: emptyStat,
	todayPageViews: { today: 0, increase: 0 },
	dayStats: [{ date: new Date().toISOString().slice(0, 10), views: 0 }],
	notifications: [{ action: '', role: '', entityType: 'User', name: '', avatar:' ', createdAt: '', changes: {} }],
	topRated: [emptyTopRated],
	latestComments:[{comment:'',author:'',avatar:'',postTitle:'',postId:'',categories:[''],seo:{slug:'',metaTitle:'',metaDescription:''}}]
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
		// fetchBasicStatsLive: builder.query<BasicStatsTypes, void>({
		// 	queryFn: () => ({ data: emptyBasicStats }),
		// 	async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
		// 		const es = new EventSource(`${API_URL}${STATISTICS_URL}/stream`)

		// 		es.onmessage = event => {
		// 			const data = JSON.parse(event.data)
		// 			updateCachedData(() => data)
		// 		}

		// 		await cacheEntryRemoved
		// 		es.close()
		// 	},
		// 	// keepUnusedDataFor: 30,
		// }),

		// fetchChartStatsLive: builder.query<ChartStatsTypes, number>({
		// 	queryFn: () => ({ data: emptyChartStats }),
		// 	async onCacheEntryAdded(days, { updateCachedData, cacheEntryRemoved }) {
		// 		const es = new EventSource(`${API_URL}${STATISTICS_URL}/stream-chart-stats?days=${days}`)

		// 		es.onmessage = event => {
		// 			const incoming: Partial<ChartStatsTypes> = JSON.parse(event.data)

		// 			updateCachedData(draft => {
		// 				if (!draft) return // draft jeszcze nie zainicjalizowany

		// 				if (incoming.todayPageViews !== undefined) draft.todayPageViews = incoming.todayPageViews
		// 				if (incoming.dayStats !== undefined) draft.dayStats = incoming.dayStats
		// 			})
		// 		}
		// 		await cacheEntryRemoved
		// 		es.close()
		// 	},
		// }),
		// fetchTopRatedPost: builder.query<TopRatedStatsTypes, void>({
		// 	queryFn: () => ({ data: emptyTopRated }),
		// 	async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
		// 		const es = new EventSource(`${API_URL}${STATISTICS_URL}/stream-top-rated-post`)

		// 		es.onmessage = event => {
		// 			const incoming: Partial<TopRatedStatsTypes> = JSON.parse(event.data)

		// 			updateCachedData(draft => {
		// 				if (!draft) return
		// 				if (incoming.topRated !== undefined) draft.topRated = incoming.topRated
		// 			})
		// 		}
		// 		await cacheEntryRemoved

		// 		es.close()
		// 	},
		// }),
		// fetchNotifications: builder.query<NotificationsTypes, void>({
		// 	queryFn: () => ({ data: emptyNotifications }),
		// 	async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
		// 		const es = new EventSource(`${API_URL}${STATISTICS_URL}/stream-notifications`)

		// 		es.onmessage = event => {
		// 			const incoming: Partial<NotificationsTypes> = JSON.parse(event.data)

		// 			updateCachedData(draft => {
		// 				if (!draft) return
		// 				if (incoming.notifications !== undefined) draft.notifications = incoming.notifications
		// 			})
		// 		}
		// 		await cacheEntryRemoved

		// 		es.close()
		// 	},
		// }),
		fetchStatisticsLive: builder.query<FullStatsTypes, number | void>({
			queryFn: () => ({
				data: emptyFullStats,
			}),
			async onCacheEntryAdded(days, { updateCachedData, cacheEntryRemoved }) {
				const es = new EventSourcePolyfill(`${API_URL}${STATISTICS_URL}/stream?days=${days}`, { withCredentials: true })

				// es.onmessage = event => {
				// 	const incoming: Partial<FullStatsTypes> = JSON.parse(event.data)
				// 	updateCachedData(draft => {
				// 		if (incoming.commentsStats) draft.commentsStats = incoming.commentsStats
				// 		if (incoming.postsStats) draft.postsStats = incoming.postsStats
				// 		if (incoming.usersStats) draft.usersStats = incoming.usersStats
				// 		if (incoming.likesStats) draft.likesStats = incoming.likesStats
				// 		if (incoming.pageViews) draft.pageViews = incoming.pageViews

				// 		// Chart stats
				// 		if (incoming.todayPageViews) draft.todayPageViews = incoming.todayPageViews
				// 		if (incoming.dayStats) draft.dayStats = incoming.dayStats

				// 		// Top rated
				// 		if (incoming.topRated) draft.topRated = incoming.topRated

				// 		// Notifications
				// 		if (incoming.notifications) draft.notifications = incoming.notifications
				// 	})
				// }
				es.onmessage = event => {
					const incoming: Partial<FullStatsTypes> = JSON.parse(event.data)
					
					updateCachedData(draft => {
						Object.assign(draft, incoming) 
					})
				}
				await cacheEntryRemoved
				es.close()
			},
		}),
	}),
})

export const { useIncrementPageViewsMutation, useIncrementPostViewsMutation, useFetchStatisticsLiveQuery } =
	statisticApi
