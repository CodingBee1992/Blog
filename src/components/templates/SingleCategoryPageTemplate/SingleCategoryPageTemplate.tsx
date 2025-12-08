import HeaderText from '../../atoms/HeaderText/HeaderText'
import PostsContent from '../../organism/PostsContent/PostsContent'
import styles from './SingleCategoryPageTemplate.module.scss'



const SingleCategoryPageTemplate = ({name}:{name:string}) => {
	return (
		<section className={`${styles.categoryContainer} sectionPages`}>
			<HeaderText>
				<h1>{name}</h1>
			</HeaderText>
			<PostsContent />
		</section>
	)
}

export default SingleCategoryPageTemplate
