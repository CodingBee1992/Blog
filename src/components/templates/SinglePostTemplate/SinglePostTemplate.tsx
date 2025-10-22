import { useLocation } from 'react-router'
import ArticleContent from '../../organism/ArticleContent/ArticleContent'
import CommentsContent from '../../organism/CommentsContent/CommentsContent'
import styles from './SinglePostTemplate.module.scss'
import postData from '../../../utils/postData'

const SinglePostTemplate = () => {
	const { search } = useLocation()
	const query = new URLSearchParams(search)
	const id = query.get('id')

	const post = postData.find(item => item.id === id)
	console.log(post)

	return (
		<div className={styles.postContainer}>
			<div className={`${styles.column} row`}>
				<div className={styles.postWrapper}>
					<ArticleContent {...post} />
				</div>
			</div>
			<CommentsContent />
		</div>
	)
}

export default SinglePostTemplate
