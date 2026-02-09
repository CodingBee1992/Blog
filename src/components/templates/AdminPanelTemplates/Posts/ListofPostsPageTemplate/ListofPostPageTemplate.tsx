
import ListOfPosts from '../../../../organism/ListOfPosts/ListOfPosts'
import styles from './ListofPostPageTemplate.module.scss'

const ListofPostPageTemplate = () => {
	return (
		<div className={styles.listOfPostContainer}>
			<ListOfPosts />
		</div>
	)
}

export default ListofPostPageTemplate
