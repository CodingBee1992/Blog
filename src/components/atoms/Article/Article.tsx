import type { PostDataProps } from '../../../types/types'
import styles from './Article.module.scss'

// interface ArticleProps{
//     href:string,
//     image:string
//     title:string
// }

const Article = ({ href, image, title, categories, author, text }: PostDataProps) => {
	
	return (
		<article className={`${styles.article} ${styles.brick}`}>
			<div className={styles.articleImage}>
				<a href={href}>
					<img src={image} alt="Article Image" />
				</a>
			</div>
			<div className={styles.articleText}>
				<div className={styles.articleHeaderText}>
					<h1 className={styles.articleTitle}>{title}</h1>
					<div className={styles.articleMeta}>
						<span className={styles.byline}>By: <span className={styles.author}><a href="#">{author}</a></span></span>
						<span className={styles.categories}>
							{categories.map((item, index) => {
								return (
									<a key={index} href={item.href}>
										{item.category}
									</a>
								)
							})}
						</span>
					</div>
				</div>
				<div className={styles.articleTextContent}>
					<p>{text}</p>
				</div>
				<a href="#" className={styles.readMoreLink}>
					Read More
				</a>
			</div>
		</article>
	)
}

export default Article
