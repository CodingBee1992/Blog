import { usePostContext } from '../../../hooks/usePostContext'
import postData from '../../../utils/postData'
import AnchorLink from '../AnchorLink/AnchorLink'

interface ArticleRightSideProps {
	styles: { [key: string]: string }
}

const ArticleRightSide = ({ styles }: ArticleRightSideProps) => {
	const { id, href } = usePostContext()

	const prevID = id === postData[0].id ? id : id - 1
	const nextID = id === postData[postData.length - 1].id ? id : id + 1

	const prevPost = postData.find(item => item.id === prevID)
	const nextPost = postData.find(item => item.id === nextID)

	console.log(nextID)
	console.log(postData[postData.length - 1].id)

	return (
		<div className={styles.articleRightSideContainer}>
			<div className={`${styles.prev} ${prevID === postData[0].id ? styles.disabled : ''} `}>
				<span>Previous</span>
				<AnchorLink href={`${href}/?id=${prevID}`} rel="prev">
					{prevID !== postData[0].id ? prevPost?.title : '-----'}
				</AnchorLink>
			</div>
			<div className={`${styles.next} ${nextID === id ? styles.disabled : ''}`}>
				<span>Next</span>
				<AnchorLink href={`${href}/?id=${nextID}`} rel="next">
					{nextID !== id ? nextPost?.title : '-----'}
				</AnchorLink>
			</div>
		</div>
	)
}

export default ArticleRightSide
