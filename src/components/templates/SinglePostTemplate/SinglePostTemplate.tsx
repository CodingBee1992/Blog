import { useLocation } from 'react-router'
import ArticleContent from '../../organism/ArticleContent/ArticleContent'
import CommentsContent from '../../organism/CommentsContent/CommentsContent'
import styles from './SinglePostTemplate.module.scss'
import { useEffect } from 'react'
import { useIncrementPostViewsMutation } from '../../../slices/api/statisticsApi'


const SinglePostTemplate = () => {
	const { search } = useLocation()
	const params = new URLSearchParams(search)
	const postId = params.get('id')

	const [incrementPostViews] = useIncrementPostViewsMutation()
	
	useEffect(() => {
		incrementPostViews({ postId })
	}, [incrementPostViews, postId])

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
