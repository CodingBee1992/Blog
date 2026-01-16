
import styles from './PageNotFoundTemplate.module.scss'
import AnchorLink from "../../atoms/AnchorLink/AnchorLink"

const PageNotFoundTemplate = () => {
    

    

  return (
    <div className={styles.pageNotFoundContainer}>
        <div className={styles.pageNotFoundWrapper}>
            <h3 className={styles.errorTitle}>404</h3>

            <div className={styles.bottom}>
            <span className={styles.errorInfo}>Sorry, that page could not be found</span>
            <AnchorLink aria-label="Home" title="Home Page" href="/" className={styles.homeBtn}>Go Back Home</AnchorLink>

            </div>
        </div>
    </div>
  )
}

export default PageNotFoundTemplate