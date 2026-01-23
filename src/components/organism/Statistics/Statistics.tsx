import { useState, type MouseEvent } from 'react'
import { useFetchStatisticsLiveQuery } from '../../../slices/api/statisticsApi'
import StatisticCard from '../../atoms/StatisticCard/StatisticCard'
import styles from './Statistics.module.scss'
import {
	ArrowDownSVG,
	ArrowUpSVG,
	CommentsSVG,
	HeartSVG,
	PostsSVG,
	UsersSVG,
	ViewsSVG,
} from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import valueConverter from '../../../hooks/valueConverter'
import StackedAreaChart from '../../atoms/StackedAreaChart/StackedAreaChart'
import PopularPosts from '../../modules/PopularPosts/PopularPosts'
import Loader from '../../atoms/loader/Loader'

import Notifications from '../../modules/Notification/Notifications'
import LatestComments from '../../modules/LatestComments/LatestComments'


const Statistics = () => {
	const [viewsFromTo, setViewsFromTo] = useState<string>('this week')
	const [scaleUp, setScaleUp] = useState<boolean>(false)
	const days = viewsFromTo === 'this week' ? 7 : 30

	const { data } = useFetchStatisticsLiveQuery(days)

	if (!data) {
		return <Loader />
	}
	const { postsStats, commentsStats, usersStats, likesStats, pageViews, todayPageViews, dayStats } = data

	
	const statConfig = [
		{ title: 'PageViews', stats: pageViews, icon: <ViewsSVG />, style: styles.pageViews },
		{ title: 'Users', stats: usersStats, icon: <UsersSVG />, style: styles.users },
		{ title: 'Posts', stats: postsStats, icon: <PostsSVG />, style: styles.posts },
		{ title: 'Comments', stats: commentsStats, icon: <CommentsSVG />, style: styles.comments },
		{ title: 'Likes', stats: likesStats, icon: <HeartSVG />, style: styles.likes },
	]
	const statCard = statConfig.map(({ title, stats, icon, style }) => ({
		statTitle: title,
		statValue: stats.total,
		statGrowthSeven: stats.growthSeven,
		statGrowthThirty: stats.growthThirty,
		icon: icon,
		style,
	}))

	const handleOpenDropDown = () => {
		setScaleUp(prev => !prev)
	}
	const handleSetViewsFromTo = (e: MouseEvent<HTMLSpanElement>) => {
		const target = e.currentTarget as HTMLSpanElement
		const value = target.textContent

		if (value) setViewsFromTo(value)

		handleOpenDropDown()
	}
	return (
		<div className={styles.statisticContainer}>
			<div className={styles.statisticWrapper}>
				{statCard.map((item, index) => (
					<StatisticCard
						key={index}
						styles={styles}
						statTitle={item.statTitle}
						statValue={valueConverter(item.statValue)}
						statGrowthSeven={valueConverter(item.statGrowthSeven)}
						statGrowthThirty={valueConverter(item.statGrowthThirty)}>
						<div className={`${styles.iconBox} ${item.style}`}>{item.icon}</div>
					</StatisticCard>
				))}
			</div>
			<div className={styles.areaChartWrapper}>
				<div className={styles.areaChartInfo}>
					<p className={styles.areaChartTitle}>Views</p>
					<div className={styles.areaCurrentViews}>
						<div className={styles.areaCurrentInfo}>
							<span>{valueConverter(todayPageViews.today)}</span>
							<span>today</span>
						</div>
						<div className={styles.areaCurrentInfo}>
							<span>
								{todayPageViews.increase}% <ArrowUpSVG className={styles.arrowUpStat} />
							</span>
							<span>increase</span>
						</div>
					</div>
					<div className={styles.areaCurrentDropdown}>
						<div className={styles.areaCurrentViewsFromTo} onClick={() => handleOpenDropDown()}>
							<span>{viewsFromTo}</span> <ArrowDownSVG className={`${scaleUp ? styles.rotate : ''}`} />
						</div>

						<div className={`${styles.areaCurrentViewsSelect} ${scaleUp ? styles.scaleUp : ''}`}>
							<span onClick={e => handleSetViewsFromTo(e)}>
								{viewsFromTo === 'this week' ? 'last month' : 'this week'}
							</span>
						</div>
					</div>
				</div>
				<div className={styles.stackedAreaChart}>
					<StackedAreaChart data={dayStats} styles={styles} />
				</div>
			</div>

			<PopularPosts />
			<Notifications />
			<LatestComments />
		</div>
	)
}

export default Statistics
