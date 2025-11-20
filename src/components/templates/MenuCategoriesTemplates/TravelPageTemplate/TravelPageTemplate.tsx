
import HeaderText from '../../../atoms/HeaderText/HeaderText'
import PostsContent from '../../../organism/PostsContent/PostsContent'
import styles from './TravelPageTemplate.module.scss'
const TravelPageTemplate = () => {
	return (
		<section className={`${styles.travelContainer} sectionPages`}>
			<HeaderText>
				<h1>Travel</h1>
			</HeaderText>
			<PostsContent />
		</section>
	)
}

export default TravelPageTemplate
