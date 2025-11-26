import PostForm from '../../../organism/PostForm/PostForm'
import styles from './EditPostPageTemplate.module.scss'


const EditPostPageTemplate = () => {
	return (
    <div className={styles.editPostContainer}>
      <PostForm />
    </div>
  )
}

export default EditPostPageTemplate
