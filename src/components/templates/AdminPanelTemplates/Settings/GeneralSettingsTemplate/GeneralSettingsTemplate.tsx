import GeneralSettings from '../../../../organism/GeneralSettings/GeneralSettings'
import DifferentSettings from '../../../../organism/DifferentSettings/DifferentSettings'
import styles from './GeneralSettingsTemplate.module.scss'

const GeneralSettingsTemplate = () => {
	return (
		<div className={styles.generalSettingsTemplateContainer}>
			<GeneralSettings />
			<DifferentSettings />
		</div>
	)
}

export default GeneralSettingsTemplate
