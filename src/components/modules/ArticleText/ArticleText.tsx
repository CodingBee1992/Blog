import ArticleLeftSide from "../../atoms/ArticleLeftSide/ArticleLeftSide"
import ArticleMiddleSide from "../../atoms/ArticleMiddleSide/ArticleMiddleSide"
import ArticleRightSide from "../../atoms/ArticleRightSide/ArticleRightSide"
import styles from './ArticleText.module.scss'

const ArticleText = () => {
  return (
    <div className={styles.articleTextContainer}>
        <ArticleLeftSide styles={styles}/>
        <ArticleMiddleSide styles={styles}/>
        <ArticleRightSide styles={styles}/>

    </div>
  )
}

export default ArticleText