import { useLocation } from 'react-router'
import { useFetchPostCreatedAtQuery } from '../../../slices/api/postApi'

import AnchorLink from '../AnchorLink/AnchorLink'
import handleCreateUrl from '../../../hooks/handleCreateUrl'
// import slugify from 'slugify'

interface ArticleRightSideProps {
	styles: { [key: string]: string }
}



const ArticleRightSide = ({ styles }: ArticleRightSideProps) => {
	const { search } = useLocation()
	const query = new URLSearchParams(search)
	const postId = query.get('id')
	const { data } = useFetchPostCreatedAtQuery(postId)

	if (!data) return

	const { prevPost, nextPost } = data

	const prevID = prevPost?._id || postId
	const nextID = nextPost?._id || postId

	

	return (
		<div className={styles.articleRightSideContainer}>
			<div className={`${styles.prev} ${prevID === postId ? styles.disabled : ''} `}>
				<span>Previous</span>
				<AnchorLink
					href={handleCreateUrl({ categories: prevPost?.categories, seo: prevPost?.seo, _id: prevID })}
					rel="prev">
					{prevID !== postId ? prevPost?.title : '-----'}
				</AnchorLink>
				
			</div>
			<div className={`${styles.next} ${nextID === postId ? styles.disabled : ''}`}>
				<span>Next</span>
				<AnchorLink
					href={handleCreateUrl({ categories: nextPost?.categories, seo: nextPost?.seo, _id: nextID })}
					rel="next">
					{nextID !== postId ? nextPost?.title : '-----'}
				</AnchorLink>
			</div>
		</div>
	)
}

export default ArticleRightSide
