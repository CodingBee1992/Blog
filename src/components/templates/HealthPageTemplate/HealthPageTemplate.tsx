import HeaderText from "../../atoms/HeaderText/HeaderText"
import styles from './HealthPageTemplate.module.scss'

const HealthPageTemplate = () => {
  return (
    <section className={`${styles.healthContainer} sectionPages`}>
      <HeaderText>
        <h1>Health</h1>
      </HeaderText>
    </section>
  )
}

export default HealthPageTemplate