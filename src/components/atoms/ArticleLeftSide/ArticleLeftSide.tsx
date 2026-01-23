import { usePostContext } from '../../../hooks/usePostContext'

interface ArticleLefSideProps {
	styles: { [key: string]: string }
}

const ArticleLeftSide = ({ styles }: ArticleLefSideProps) => {
	const { author, categories } = usePostContext()
	
	return (
		<div className={styles.articleLeftSideContainer}>
			<div className={styles.authorContent}>
				<div className={styles.authorAvatar}>
					<img src={author.avatar.src} alt={`Author's photo`} />
				</div>
				<div className={styles.byline}>
					<span>Posted By</span>
					<a href="#">{author.name}</a>
				</div>
			</div>
			<div className={styles.metaBottom}>
				<div className={styles.catLinksBox}>
					<div className={styles.catLinks}>
						<span>In </span>
						{categories.map((item, index) => (
							<a key={index} href={`/categories/${item.split(' ').join('-').toLowerCase()}`}>
								{item}
							</a>
						))}
					</div>
					<span>On</span> 22/10/2025
				</div>
				<div className={styles.tags}>
					<span className={styles.tagtext}>Tags</span>
					<a href="#">dsfdf</a>
					<a href="#">dsfdf</a>
					<a href="#">dsfdf</a>
					<a href="#">dsfdf</a>
				</div>
			</div>
		</div>
	)
}

export default ArticleLeftSide
