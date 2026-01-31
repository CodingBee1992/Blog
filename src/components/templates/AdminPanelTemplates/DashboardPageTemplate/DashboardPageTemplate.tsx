import useWindowSize from '../../../../hooks/useWindowSize'

import Statistics from '../../../organism/Statistics/Statistics'
import styles from './DashboardPageTemplate.module.scss'

const DashboardPageTemplate = () => {
	const size = useWindowSize()
	const isMobile = size.width < 800
	return (
		<div className={styles.dashboardPageTemplateContainer}>
			{isMobile ? '' : <h3 className={styles.statisticTitle}>Dashboard</h3>}

			<Statistics />
		</div>
	)
}

export default DashboardPageTemplate
