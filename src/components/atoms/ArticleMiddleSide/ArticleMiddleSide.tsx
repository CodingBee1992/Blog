import { usePostContext } from '../../../hooks/usePostContext'
import ResponsiveArticleImage from '../ResponsiveArticleImage/ResponsiveArticleImage';


interface ArticleMiddleSideProps {
	styles: { [key: string]: string }
}

type ArticleBlock =
	| { type: 'title' | 'text' | 'completion' | 'callToAction' | 'add'; value: string }
	| { type: 'image'; value: { src: string; alt: string; caption: string } }

const ArticleMiddleSide = ({ styles }: ArticleMiddleSideProps) => {
	const { articleContent, introduction } = usePostContext()

	const text = introduction
	const halfTextLength = Math.ceil(text?.length / 2)
	const dotindex = text?.indexOf('.', halfTextLength)
	const firstPart = text?.slice(0, dotindex + 1)
	const secondPart = text?.slice(dotindex + 1)

	if (!articleContent) return
	const articleWithAds = articleContent.flatMap((block, index) => {
		const blocks = [block]
		if ((index + 1) % 4 === 0) {
			blocks.push({ type: 'add', value: 'ad-slot-1' })
		}
		return blocks
	})

	

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

						return null
					})}
					{articleContent.map((item: ArticleBlock, index: number) => {
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
					})}
				</div>
			</div>
			<div>Gallery Content</div>
		</div>
	)
}

export default ArticleMiddleSide
