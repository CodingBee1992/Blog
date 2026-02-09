import IntegrationsSocialLinks from '../../../../organism/IntegrationsSocialLinks/IntegrationsSocialLinks'
import styles from './IntegrationsSettingsTemplate.module.scss'

const IntegrationsPageTemplate = () => {
	return (
		<div className={styles.integrationsSettingsTemplateContainer}>
			<IntegrationsSocialLinks />
		</div>
	)
}

export default IntegrationsPageTemplate
