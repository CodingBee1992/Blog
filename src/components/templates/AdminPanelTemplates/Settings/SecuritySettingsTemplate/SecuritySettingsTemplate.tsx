import SecuritySettings from "../../../../organism/SecuritySettings/SecuritySettings"
import styles from './SecuritySettingsTemplate.module.scss'

const SecuritySettingsTemplate = () => {
  return (
    <div className={styles.securitySettingsTemplateContainer}>

        <SecuritySettings />
    </div>
  )
}

export default SecuritySettingsTemplate