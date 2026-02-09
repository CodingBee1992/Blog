import EmailSettings from '../../../../organism/EmailSettings/EmailSettings'
import styles from './EmailSettingsTemplate.module.scss'

const EmailSettingsTemplate = () => {
	return (
		<div className={styles.emailSettingsTemplateContainer}>
			<EmailSettings />
		</div>
	)
}

export default EmailSettingsTemplate
