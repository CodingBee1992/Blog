import AnalyticsSettings from '../../../organism/AnalyticsSettings/AnalyticsSettings'
import BlogSettings from '../../../organism/BlogSettings/BlogSettings'
import CommentsSettings from '../../../organism/CommentsSettings/CommentsSettings'
import DifferentSettings from '../../../organism/DifferentSettings/DifferentSettings'
import GeneralSettings from '../../../organism/GeneralSettings/GeneralSettings'
import SecuritySettings from '../../../organism/SecuritySettings/SecuritySettings'
import styles from './GeneralSettingsTemplate.module.scss'

const GeneralSettingsTemplate = () => {
	return (
		<div className={styles.generalSettingsTemplateContainer}>
			<GeneralSettings />
			<SecuritySettings />
			<CommentsSettings />
			<BlogSettings />
			<AnalyticsSettings />
			<DifferentSettings />
		</div>
	)
}

export default GeneralSettingsTemplate
