import ArticleHeader from "../../atoms/ArticleHeader/ArticleHeader"
import ArticleImage from "../../atoms/ArticleImage/ArticleImage"
import ArticleText from "../../modules/ArticleText/ArticleText"
import styles from './ArticleContent.module.scss'

const ArticleContent = () => {
  return (
    <div className={styles.articleContainer}>
        <ArticleImage />
        <ArticleHeader />
        <ArticleText />
    </div>
  )
}

export default ArticleContent