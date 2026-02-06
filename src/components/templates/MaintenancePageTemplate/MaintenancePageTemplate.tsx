import MaintenanceWrapper from '../../modules/MaintenanceWrapper/MaintenanceWrapper'
import styles from './MaintenancePageTemplate.module.scss'
const MaintenancePageTemplate = () => {
	return (
		<main className={styles.maintenancePageTemplateContainer}>
			<MaintenanceWrapper />
		</main>
	)
}

export default MaintenancePageTemplate
