import type { JSX } from 'react'
import {
	CalendarSVG,
	CommentsSVG,
	HeartSVG,
	PostsSVG,
	UsersSVG,
} from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import { useFetchStatisticsLiveQuery } from '../../../slices/api/statisticsApi'
import styles from './Notifications.module.scss'
import notificationHelper from '../../../hooks/notificationHelper'

type EntityType = 'User' | 'Post' | 'Comment' | 'Like'

const Notifications = () => {
	const { data } = useFetchStatisticsLiveQuery(7)

	if (!data) return

	const { notifications } = data
	return (
		<div className={styles.notificationsContainer}>
			<h3 className={styles.notificationsTitle}>Notifications</h3>

			{notifications.map((notif, index) => {
				const currentTime = Date.now()
				const createdTime = new Date(notif.createdAt).getTime()
				const diffTime = currentTime - createdTime

				const seconds = Math.floor(diffTime / 1000)
				const minutes = Math.floor(seconds / 60)
				const hours = Math.floor(minutes / 60)
				const days = Math.floor(hours / 24)

				let timeAgo = ''
				if (seconds < 60) {
					timeAgo = `${seconds} s ago`
				} else if (minutes < 60) {
					timeAgo = `${minutes} min ago`
				} else if (hours < 24) {
					timeAgo = `${hours} hr ago`
				} else if (days < 7) {
					timeAgo = `${days} d ago`
				} else if (days < 14) {
					timeAgo = 'Last week'
				} else {
					timeAgo = `${new Date(notif.createdAt).toLocaleDateString()}`
				}
				const iconsMap: Record<EntityType, JSX.Element> = {
					User: <UsersSVG className={styles.user} />,
					Post: <PostsSVG className={styles.post} />,
					Comment: <CommentsSVG className={styles.comment} />,
					Like: <HeartSVG className={styles.like} />,
				}

				const icon = iconsMap[notif.entityType]

				return (
					<div key={index} className={styles.notificationsWrapper}>
						<div className={styles.notificationsImages}>
							<div className={styles.notificationsIcon}>{icon}</div>
							<div className={styles.notificationsAvatar}>
								<img src={notif.avatar} alt="User" />
							</div>
						</div>
						<div className={styles.notificationsInfo}>
							<span className={styles.notificationAuthor}>{notif.name}</span>
							<p className={styles.notificationsAction}>{notificationHelper({notif })}</p>
						</div>
						<div className={styles.notificationsDate}>
							<CalendarSVG />
							<span className={styles.date}>{timeAgo}</span>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Notifications
