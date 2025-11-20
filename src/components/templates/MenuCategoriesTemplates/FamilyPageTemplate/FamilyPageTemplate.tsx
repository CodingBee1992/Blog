
import HeaderText from '../../../atoms/HeaderText/HeaderText'
import styles from './FamilyPageTemplate.module.scss'
const FamilyPageTemplate = () => {
	return (
		<section className={`${styles.familyContainer} sectionPages`}>
			<HeaderText>
				<h1>Family</h1>
			</HeaderText>
		</section>
	)
}

export default FamilyPageTemplate
