import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useFetchBasicStatsQuery } from '../../../slices/api/statisticsApi'
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

const Statistics = () => {
	const [viewsFromTo, setViewsFromTo] = useState<string>('this week')
	const viewsRef = useRef<HTMLDivElement | null>(null)
	const arrowRef = useRef<SVGSVGElement | null>(null)
	const { data, refetch } = useFetchBasicStatsQuery({})

	useEffect(() => {
		refetch()
	}, [refetch])

	if (!data) return
	const { postsStats, commentsStats, usersStats,likesStats } = data

	const statCard = [
		{
			statTitle: 'PageViews',
			statValue: 134005,
			statGrowthSeven: 55,
			statGrowthThirty: 64,
			icon: <ViewsSVG />,
			style: styles.pageViews,
		},

		{
			statTitle: 'Users',
			statValue: usersStats.total,
			statGrowthSeven: usersStats.growthSeven,
			statGrowthThirty: usersStats.growthThirty,
			icon: <UsersSVG />,
			style: styles.users,
		},

		{
			statTitle: 'Posts',
			statValue: postsStats.total,
			statGrowthSeven: postsStats.lastSeven,
			statGrowthThirty: postsStats.lastThirty,
			icon: <PostsSVG />,
			style: styles.posts,
		},

		{
			statTitle: 'Comments',
			statValue: commentsStats.total,
			statGrowthSeven: commentsStats.lastSeven,
			statGrowthThirty: commentsStats.lastThirty,
			icon: <CommentsSVG />,
			style: styles.comments,
		},
		{
			statTitle: 'Likes',
			statValue: likesStats.total,
			statGrowthSeven: likesStats.lastSeven,
			statGrowthThirty: likesStats.lastThirty,
			icon: <HeartSVG />,
			style: styles.likes,
		},
	]

	const handleOpenDropDown = () => {
		if (!viewsRef.current?.classList.contains(styles.scaleUp)) {
			viewsRef.current?.classList.add(styles.scaleUp)
			arrowRef.current?.classList.add(styles.rotate)
			
		} else {
			arrowRef.current?.classList.remove(styles.rotate)
			viewsRef.current?.classList.remove(styles.scaleUp)
		}
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
						statGrowthSeven={item.statGrowthSeven}
						statGrowthThirty={item.statGrowthThirty}>
						<div className={`${styles.iconBox} ${item.style}`}>{item.icon}</div>
					</StatisticCard>
				))}
			</div>
			<div className={styles.areaChartWrapper}>
				<div className={styles.areaChartInfo}>
					<p className={styles.areaChartTitle}>Views</p>
					<div className={styles.areaCurrentViews}>
						<div className={styles.areaCurrentInfo}>
							<span>{valueConverter(32334)}</span>
							<span>today</span>
						</div>
						<div className={styles.areaCurrentInfo}>
							<span>
								5% <ArrowUpSVG className={styles.arrowUpStat} />
							</span>
							<span>increase</span>
						</div>
					</div>
					<div className={styles.areaCurrentDropdown}>
						<div className={styles.areaCurrentViewsFromTo} onClick={() => handleOpenDropDown()}>
							<span>{viewsFromTo}</span> <ArrowDownSVG arrowRef={arrowRef}/>
						</div>

						<div ref={viewsRef} className={styles.areaCurrentViewsSelect}>
							<span onClick={e => handleSetViewsFromTo(e)}>
								{viewsFromTo === 'this week' ? 'last month' : 'this week'}
							</span>
						</div>
					</div>
				</div>
				<StackedAreaChart styles={styles} />
			</div>

			<PopularPosts />
		</div>
	)
}

export default Statistics
