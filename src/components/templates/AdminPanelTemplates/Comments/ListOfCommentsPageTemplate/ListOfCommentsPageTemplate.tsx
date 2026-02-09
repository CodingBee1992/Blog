
import ListOfComments from '../../../../organism/ListOfComments/ListOfComments'
import styles from './ListOfCommentsPageTemplate.module.scss'

const ListOfCommentsPageTemplate = () => {
  return (
    <div className={styles.ListOfCommentsContainer}>
      <ListOfComments />

    </div>
  )
}

export default ListOfCommentsPageTemplate