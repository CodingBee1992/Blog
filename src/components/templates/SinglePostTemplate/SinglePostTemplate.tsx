// import { useEffect } from 'react'
// import useTimeSpentOnPage from '../../../hooks/useTimeSpentOnPage'
// import useScrollTracking from '../../../hooks/useScrollTracking'
import ArticleContent from '../../organism/ArticleContent/ArticleContent'
import CommentsContent from '../../organism/CommentsContent/CommentsContent'
import styles from './SinglePostTemplate.module.scss'
// import { trackTimeSpent } from '../../../utils/gtag'
// import Cookies from 'js-cookie'
const SinglePostTemplate = () => {
	// const timeSpent = useTimeSpentOnPage()

	// useEffect(() => {
	// 	const consent = Cookies.get('isAnalyticCookieAccept') === 'true'

	// 	if (consent && timeSpent > 0) {
	// 		trackTimeSpent(timeSpent)
	// 	}

	// }, [timeSpent])

	// useScrollTracking()

	return (
		<div className={styles.postContainer}>
			<div className={`${styles.column} row`}>
				<div className={styles.postWrapper}>
					<ArticleContent />
				</div>
			</div>
			<CommentsContent />
		</div>
	)
}

export default SinglePostTemplate
