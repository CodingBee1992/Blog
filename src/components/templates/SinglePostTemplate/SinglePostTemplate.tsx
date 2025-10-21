import ArticleContent from '../../organism/ArticleContent/ArticleContent'
import CommentsContent from '../../organism/CommentsContent/CommentsContent'
import styles from './SinglePostTemplate.module.scss'

const SinglePostTemplate = () => {
  return (
    <div className={styles.postContainer}>
        <div className={`${styles.column} row`}>
            <div className={styles.postWrapper}>
                <ArticleContent/>
            </div>
        </div>
        <CommentsContent />
    </div>
  )
}

export default SinglePostTemplate