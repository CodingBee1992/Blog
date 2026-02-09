import { useLocation } from 'react-router'
import ArticleContent from '../../organism/ArticleContent/ArticleContent'
import CommentsContent from '../../organism/CommentsContent/CommentsContent'
import styles from './SinglePostTemplate.module.scss'
import { useEffect } from 'react'
import { useIncrementPostViewsMutation } from '../../../slices/api/statisticsApi'
import useMenuContext from '../../../hooks/useMenuContext'
import useIncrementViews from '../../../hooks/useIncrementViews'

const SinglePostTemplate = () => {
	const { search } = useLocation()
	const params = new URLSearchParams(search)
	const postId = params.get('id')
	const { handleIncrementPostViews } = useIncrementViews()
	const [incrementPostViews] = useIncrementPostViewsMutation()
	const { analytics } = useMenuContext()

	useEffect(() => {
		if (!postId) return

		if (analytics && !analytics.analyticsEnabled) {
			incrementPostViews({ postId })
		} else {
			handleIncrementPostViews({ postId })
		}
	}, [analytics, handleIncrementPostViews, incrementPostViews, postId])

	// useEffect(() => {
	// 	let timeout: ReturnType<typeof setTimeout>

	// 	const tick = () => {
	// 		incrementPostViews({ postId })

	// 		timeout = setTimeout(tick, 10)
	// 	}

	// 	tick()

	// 	return () => clearTimeout(timeout)
	// }, [incrementPostViews, postId])

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
