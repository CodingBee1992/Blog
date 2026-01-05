import Statistics from '../../../organism/Statistics/Statistics'
import styles from './AdminPanelPageTemplate.module.scss'

const AdminPanelPageTemplate = () => {
	return (
		<div className={styles.adminPanelTemplateContainer}>
			<h3 className={styles.statisticTitle}>Dashboard</h3>
			<Statistics />
		</div>
	)
}

export default AdminPanelPageTemplate
