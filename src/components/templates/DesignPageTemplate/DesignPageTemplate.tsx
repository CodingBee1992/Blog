import HeaderText from "../../atoms/HeaderText/HeaderText"
import styles from './DesignPageTemplate.module.scss'

const DesignPageTemplate = () => {
	return (
		<section className={`${styles.designContainer} sectionPages`}>
			<HeaderText>
				<h1>Design</h1>
			</HeaderText>
		</section>
	)
}

export default DesignPageTemplate
