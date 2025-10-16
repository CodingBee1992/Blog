import HeaderText from "../../atoms/HeaderText/HeaderText"
import styles from './WorkPageTemplate.module.scss'
const WorkPageTemplate = () => {
	return (
		<section className={`${styles.workContainer} sectionPages`}>
			<HeaderText>
				<h1>Work</h1>
			</HeaderText>
		</section>
	)
}

export default WorkPageTemplate
