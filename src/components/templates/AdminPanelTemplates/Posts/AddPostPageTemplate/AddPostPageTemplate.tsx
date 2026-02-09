
import PostForm from '../../../../organism/PostForm/PostForm'
import styles from './AddPostPageTemplate.module.scss'

const AddPostPageTemplate = () => {
	return (
		<div className={styles.addPostContainer}>
			<PostForm />
		</div>
	)
}

export default AddPostPageTemplate
