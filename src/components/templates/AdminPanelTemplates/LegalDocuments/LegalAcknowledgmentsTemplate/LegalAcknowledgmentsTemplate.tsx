import LegalAcknownledgments from '../../../../organism/LegalAcknownledgments/LegalAcknownledgments'
import styles from './LegalAcknowledgments.module.scss'

const LegalAcknowledgmentsTemplate = () => {
	return (
		<div className={styles.legalAcknowledgmentsContainer}>
			<LegalAcknownledgments />
		</div>
	)
}

export default LegalAcknowledgmentsTemplate
