import { usePostContext } from '../../../hooks/usePostContext'
import { useFetchAllPostsQuery } from '../../../slices/api/apiSlice'
import type { ArticleContentProps } from '../../../types/types'
// import postData from '../../../utils/postData'
import AnchorLink from '../AnchorLink/AnchorLink'

interface ArticleRightSideProps {
	styles: { [key: string]: string }
}

const ArticleRightSide = ({ styles }: ArticleRightSideProps) => {
	const post = usePostContext()
	const { data } = useFetchAllPostsQuery({})
	
	if (!data) return null
	if (!post) return null

	const currentIndex = data.findIndex((item: ArticleContentProps) => item._id === post._id)
	const nextPost = currentIndex > 0 ? data[currentIndex - 1] : null
	const prevPost = currentIndex < data.length - 1 ? data[currentIndex + 1] : null
	const prevID = prevPost?._id || post._id
	const nextID = nextPost?._id || post._id
	// const prevID = post._id === data[0].id ? post._id : data[data.indexOf(post._id) - 1].post._id
	// const nextID = post._id === data[data.length - 1].post._id ? post._id : data[data.indexOf(post._id) + 1].post._id
	// console.log(nextID)
	// console.log(prevID)

	// const prevPost = data.find((item: ArticleContentProps) => item._id === prevID)
	// console.log(prevPost)
	// const nextPost = data.find((item: ArticleContentProps) => item._id === nextID)

	return (
		<div className={styles.articleRightSideContainer}>
			<div className={`${styles.prev} ${prevID === post._id ? styles.disabled : ''} `}>
				<span>Previous</span>
				<AnchorLink href={`/blog/?id=${prevID}`} rel="prev">
					{prevID !== post._id ? prevPost?.mainTitle : '-----'}
				</AnchorLink>
			</div>
			<div className={`${styles.next} ${nextID === post._id ? styles.disabled : ''}`}>
				<span>Next</span>
				<AnchorLink href={`/blog/?id=${nextID}`} rel="next">
					{nextID !== post._id ? nextPost?.mainTitle : '-----'}
				</AnchorLink>
			</div>
		</div>
	)
}

export default ArticleRightSide
