
import type { ArticleContentProps } from '../../../types/types'
import ArticleHeader from '../../atoms/ArticleHeader/ArticleHeader'
import ArticleImage from '../../atoms/ArticleImage/ArticleImage'
import ArticleText from '../../modules/ArticleText/ArticleText'
import styles from './ArticleContent.module.scss'




const ArticleContent = ({title,image}:ArticleContentProps) => {
		
	return (
		<article className={styles.articleContainer}>
			<ArticleImage  image={image}/>
			<ArticleHeader  title={title}/>
			<ArticleText  />
		</article>
	)
}

export default ArticleContent
