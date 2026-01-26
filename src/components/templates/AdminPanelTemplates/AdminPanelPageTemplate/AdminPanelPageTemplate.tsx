import useWindowSize from '../../../../hooks/useWindowSize'


import Statistics from '../../../organism/Statistics/Statistics'
import styles from './AdminPanelPageTemplate.module.scss'

const AdminPanelPageTemplate = () => {
	const size = useWindowSize()
	const isMobile = size.width < 800
	return (
		<div className={styles.adminPanelTemplateContainer}>
			{isMobile ? '' : <h3 className={styles.statisticTitle}>Dashboard</h3>}

			<Statistics />
		</div>
	)
}

export default AdminPanelPageTemplate
