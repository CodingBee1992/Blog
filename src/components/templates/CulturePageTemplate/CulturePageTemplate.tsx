import HeaderText from "../../atoms/HeaderText/HeaderText"
import PostsContent from "../../organism/PostsContent/PostsContent"
import styles from './CulturePageTemplate.module.scss'
const CulturePageTemplate = () => {
	return (
		<section className={`${styles.cultureContainer} sectionPages`}>
			<HeaderText>
				<h1>Culture</h1>
			</HeaderText>
			<PostsContent />
		</section>
	)
}

export default CulturePageTemplate
