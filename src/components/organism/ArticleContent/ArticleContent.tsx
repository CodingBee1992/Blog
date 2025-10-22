import ArticleHeader from '../../atoms/ArticleHeader/ArticleHeader'
import ArticleImage from '../../atoms/ArticleImage/ArticleImage'
import ArticleText from '../../modules/ArticleText/ArticleText'
import styles from './ArticleContent.module.scss'

const ArticleContent = () => {
	return (
		<article className={styles.articleContainer}>
			<ArticleImage styles={styles} />
			<ArticleHeader styles={styles} />
			<ArticleText />
		</article>
	)
}

export default ArticleContent
