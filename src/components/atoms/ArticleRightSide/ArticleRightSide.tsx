import { useLocation } from 'react-router'
import { useFetchPostCreatedAtQuery } from '../../../slices/api/apiSlice'

import AnchorLink from '../AnchorLink/AnchorLink'

interface ArticleRightSideProps {
	styles: { [key: string]: string }
}

const ArticleRightSide = ({ styles }: ArticleRightSideProps) => {
	const { search } = useLocation()
	const query = new URLSearchParams(search)
	const postId = query.get('id')
	const { data } = useFetchPostCreatedAtQuery(postId)

	if (!data) return null

	const { prevPost, nextPost } = { ...data }
	

	const prevID = prevPost?._id || postId
	const nextID = nextPost?._id || postId

	return (
		<div className={styles.articleRightSideContainer}>
			<div className={`${styles.prev} ${prevID === postId ? styles.disabled : ''} `}>
				<span>Previous</span>
				<AnchorLink href={`/blog/?id=${prevID}`} rel="prev">
					{prevID !== postId ? prevPost?.title : '-----'}
				</AnchorLink>
			</div>
			<div className={`${styles.next} ${nextID === postId ? styles.disabled : ''}`}>
				<span>Next</span>
				<AnchorLink href={`/blog/?id=${nextID}`} rel="next">
					{nextID !== postId ? nextPost?.title : '-----'}
				</AnchorLink>
			</div>
		</div>
	)
}

export default ArticleRightSide
