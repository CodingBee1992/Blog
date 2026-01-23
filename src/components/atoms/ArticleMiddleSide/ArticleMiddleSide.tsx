import { useLocation } from 'react-router'
import { CommentsSVG, HeartSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import { usePostContext } from '../../../hooks/usePostContext'
import { useFetchLiveCommentsQuery } from '../../../slices/api/commentsApi'
import ResponsiveArticleImage from '../ResponsiveArticleImage/ResponsiveArticleImage'
import {
	useFetchLivePostLikesQuery,
	
	useFetchUserLikedPostQuery,
	useToogleLikePostMutation,
} from '../../../slices/api/postLikeApi'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import { useMemo } from 'react'

interface ArticleMiddleSideProps {
	styles: { [key: string]: string }
}

type ArticleBlock =
	| { type: 'title' | 'text' | 'completion' | 'callToAction' | 'add'; value: string }
	| { type: 'image'; value: { src: string; alt: string; caption: string } }

const ArticleMiddleSide = ({ styles }: ArticleMiddleSideProps) => {
	const { articleContent, introduction } = usePostContext()
	const { search } = useLocation()
	const params = new URLSearchParams(search)
	const postId = params.get('id')
	const { id, isLogged } = useSelector((state: RootState) => state.auth)

	const { data } = useFetchLiveCommentsQuery(postId!, { skip: !postId })
	const [likePost] = useToogleLikePostMutation()
	const { data: likedPost } = useFetchUserLikedPostQuery({ postId, userId: id }, { skip: !isLogged || !postId || !id })
	const { data: postLikes } = useFetchLivePostLikesQuery(postId!, { skip: !postId })
	
	const { firstPart, secondPart } = useMemo(() => {
		if (!introduction) return { firstPart: '', secondPart: '' }

		const halfTextLength = Math.ceil(introduction.length / 2)
		const dotindex = introduction?.indexOf('.', halfTextLength)

		return {
			firstPart: introduction?.slice(0, dotindex + 1),
			secondPart: introduction?.slice(dotindex + 1),
		}
	}, [introduction])

	const articleWithAds = useMemo<ArticleBlock[]>(() => {
		if (!articleContent) return []

		return articleContent.flatMap((block, index) => {
			return (index + 1) % 4 === 0 ? [block, { type: 'add', value: 'ad-slot-1' }] : [block]
		})
	}, [articleContent])

	const handleSetLike = async () => {
		if (!postId) return
		await likePost(postId)
	}

	return (
		<div className={styles.articleMiddleSideContainer}>
			<div className={styles.articleMainText}>
				<p>{firstPart}</p>
				<p>{secondPart}</p>
			</div>
			<div className={styles.articleContentContainer}>
				<div className={styles.articleContent}>
					{articleWithAds.map((item: ArticleBlock, index: number) => {
						if (item.type === 'title') {
							return (
								<h3 key={index} className={styles.articleContentTitle}>
									{item.value}
								</h3>
							)
						}
						if (item.type === 'text') {
							return (
								<p key={index} className={styles.articleContentText}>
									{item.value}
								</p>
							)
						}
						if (item.type === 'add') {
							return (
								<p key={index} className={styles.articleContentText}>
									To jest miejsce na reklame
								</p>
							)
						}
						if (item.type === 'image') {
							return (
								<div key={index} className={styles.articleImage}>
									<ResponsiveArticleImage mainImageSrc={item.value.src} imageAlt={item.value.alt} />
									{/* <img src={item.value.src} alt={item.value.alt} /> */}
									<span className={styles.articleImageText}>{item.value.caption}</span>
								</div>
							)
						}
						if (item.type === 'completion') {
							return (
								<p key={index} className={styles.articleContentText}>
									{item.value}
								</p>
							)
						}
						if (item.type === 'callToAction') {
							return (
								<p key={index} className={styles.articleContentText}>
									{item.value}
								</p>
							)
						}
						return null
					})}
				</div>
			</div>

			<div className={styles.articleReactionsBox}>
				<div className={styles.articleReactionsInfo}>
					<span className={styles.articleLikes}>
						<span className={styles.articleSVG}>
							<HeartSVG className={styles.articleLikeSVG} />
						</span>
						{postLikes && postLikes > 0
							? postLikes === 1
								? `${postLikes} Like`
								: `${postLikes} Likes`
							: `${postLikes} Likes`}
					</span>
					<span className={styles.articleComments}>
						<span className={styles.articleSVG}>
							<CommentsSVG className={styles.articleCommentSVG} />
						</span>
						{data && data.length > 0
							? data?.length === 1
								? `${data?.length} Comment`
								: `${data?.length} Comments`
							: `${data?.length} Comments`}
					</span>
				</div>
				{isLogged && (
					<button aria-label="Like button" className={styles.articleReactionButton} onClick={() => handleSetLike()}>
						{likedPost?.userId === id ? 'Unlike' : 'Like'}
					</button>
				)}
			</div>
		</div>
	)
}

export default ArticleMiddleSide
