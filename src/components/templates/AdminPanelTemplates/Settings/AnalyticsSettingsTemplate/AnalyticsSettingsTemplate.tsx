import AnalyticsSettings from '../../../../organism/AnalyticsSettings/AnalyticsSettings'
import styles from './AnalyticsSettingsTemplate.module.scss'

const AnalyticsSettingsTemplate = () => {
  return (
    <div className={styles.analyticsSettingsTemplateContainer}>
        <AnalyticsSettings />
    </div>
  )
}

export default AnalyticsSettingsTemplate