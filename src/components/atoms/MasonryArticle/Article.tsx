import useResponsiveCloudinaryImage from '../../../hooks/useResponsiveCloudinaryImage'
import type { ArticleContentProps } from '../../../types/types'
import AnchorLink from '../AnchorLink/AnchorLink'
import styles from './Article.module.scss'
import useWindowSize from '../../../hooks/useWindowSize'

import handleCreateUrl from '../../../hooks/handleCreateUrl'

const Article = ({
	_id,

	mainImage,
	title,
	categories,
	author,
	introduction,
	left,
	top,
	articleRef,
	seo,
	onImageLoad,
}: ArticleContentProps) => {
	const { width } = useWindowSize()
	const mainImageSrc = mainImage.src

	let defaultWidth
	if (width > 1400) {
		defaultWidth = 400
	}

	if (width <= 1400) {
		defaultWidth = 500
	}
	if (width <= 1100) {
		defaultWidth = 600
	}
	if (width <= 700) {
		defaultWidth = 700
	}
	const responsiveImage = useResponsiveCloudinaryImage({ mainImageSrc, defaultWidth })


	return (
		<article
			data-aos="fade-up"
			ref={articleRef}
			className={`${styles.article} ${styles.brick}`}
			style={{ position: 'absolute', left, top }}>
			<div className={styles.articleImage}>
				<AnchorLink href={handleCreateUrl({  categories, seo,  _id })}>
					<img src={responsiveImage} alt={mainImage.alt} onLoad={onImageLoad} />
				</AnchorLink>
			</div>
			<div className={styles.articleText}>
				<div className={styles.articleHeaderText}>
					<h1 className={styles.articleTitle}>{title}</h1>
					<div className={styles.articleMeta}>
						<span className={styles.byline}>
							By:{' '}
							<span className={styles.author}>
								<a href="#">{author.name}</a>
							</span>
						</span>
						<span className={styles.categories}>
							{categories.map((item, index) => {
								return (
									<AnchorLink key={index} href={`/categories/${item}`}>
										{item}
									</AnchorLink>
								)
							})}
						</span>
					</div>
				</div>
				<div className={styles.articleTextContent}>
					<p>{introduction}</p>
				</div>
				<AnchorLink
					ariaLabel={`Read more about ${title}`}
					href={handleCreateUrl({ categories, seo, _id })}
					className={styles.readMoreLink}>
					Read More
				</AnchorLink>
			</div>
		</article>
	)
}

export default Article
