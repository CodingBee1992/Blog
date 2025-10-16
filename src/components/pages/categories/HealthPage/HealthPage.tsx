import HeaderText from '../../../atoms/HeaderText/HeaderText'
import styles from './HealthPage.module.scss'

const HealthPage = () => {
  return (
    <div className={`${styles.healthContainer} sectionPages`}>
      <HeaderText>
        <h1>Health</h1>
      </HeaderText>
    </div>
  )
}

export default HealthPage