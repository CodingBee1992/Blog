import type { ReactNode } from 'react'

interface StatisticCardProps {
	children: ReactNode
	styles: Record<string, string>
	statTitle: string
	statValue: number | string
	statGrowthSeven: number
	statGrowthThirty: number
}

const StatisticCard = ({
	children,
	styles,
	statValue,
	statTitle,
	statGrowthSeven,
	statGrowthThirty,
}: StatisticCardProps) => {
	
	return (
		<div className={styles.statisticCardContainer}>
			<div className={styles.statBox}>
				{children}
				<div className={styles.statMain}>
					<span className={styles.statValue}>{statValue}</span>
					<span className={styles.statTitle}>{statTitle}</span>
				</div>
			</div>
			<div className={styles.statGrowth}>
				<div className={styles.statGrowthBox}>
					<span className={styles.statGrowthPercent}>{statGrowthSeven}%</span>
					<span className={styles.lastSpan}>Last 7 days</span>
				</div>
				<div className={styles.statGrowthBox}>
					<span className={styles.statGrowthPercent}>{statGrowthThirty}%</span>
					<span className={styles.lastSpan}>Last 30 days</span>
				</div>
			</div>
		</div>
	)
}

export default StatisticCard
