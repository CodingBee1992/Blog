
import type { ArticleContentProps } from '../../../types/types'
import AnchorLink from '../AnchorLink/AnchorLink'
import styles from './Article.module.scss'

const Article = ({ id, href, image, title, categories, author, text, left, top, articleRef }: ArticleContentProps) => {
	return (
		<article
			data-aos="fade-up"
			ref={articleRef}
			className={`${styles.article} ${styles.brick}`}
			style={{ position: 'absolute', left, top }}>
			<div className={styles.articleImage}>
				<AnchorLink href={`${href}/?id=${id}`}>
					<img src={image} alt="Article Image" />
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
									<AnchorLink key={index} href={item.href}>
										{item.category}
									</AnchorLink>
								)
							})}
						</span>
					</div>
				</div>
				<div className={styles.articleTextContent}>
					<p>{text}</p>
				</div>
				<AnchorLink href={`${href}/?id=${id}`} className={styles.readMoreLink}>
					Read More
				</AnchorLink>
			</div>
		</article>
	)
}

export default Article
