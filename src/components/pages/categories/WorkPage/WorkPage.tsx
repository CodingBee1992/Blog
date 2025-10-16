import HeaderText from '../../../atoms/HeaderText/HeaderText'
import styles from './WorkPage.module.scss'
const WorkPage = () => {
	return (
		<div className={`${styles.workContainer} sectionPages`}>
			<HeaderText>
				<h1>Work</h1>
			</HeaderText>
		</div>
	)
}

export default WorkPage
