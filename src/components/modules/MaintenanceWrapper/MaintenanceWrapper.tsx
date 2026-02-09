
import { useFetchSettingsQuery } from '../../../slices/api/generalSettingsApi'
import SocialLinks from '../SocialLinks/SocialLinks'

import styles from './MaintenanceWrapper.module.scss'

const MaintenanceWrapper = () => {
	const { data, isLoading } = useFetchSettingsQuery({})
   
	const breakUntil = data.security.maintenanceMode.breakUntil

	if (isLoading) return null
	const formattedDate = new Date(breakUntil).toLocaleString('pl-PL', {
		day: 'numeric',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})

	return (
		<div className={styles.maintenanceWrapper}>
			<div className={styles.maintenanceCard}>
				<h1 className={styles.maintenanceTitle}>Technical Break</h1>

				<div className={styles.maintenanceContent}>
					<p className={styles.maintenanceDescription}>We’re making some updates. Sorry for the inconvenience.</p>

					<div className={styles.maintenanceTime}>
						<span className={styles.maintenanceLabel}>Planned return</span>
						<span className={styles.maintenanceDate}>{breakUntil !== null ? formattedDate : 'Until further notice'}</span>
					</div>
				</div>

				<footer className={styles.maintenanceFooter}>
					<p className={styles.maintenanceFooterText}>Stay up to date:</p>
					<div className={styles.maintenanceSocials}>
						<SocialLinks />
					</div>
				</footer>
			</div>
		</div>
	)
}

export default MaintenanceWrapper
