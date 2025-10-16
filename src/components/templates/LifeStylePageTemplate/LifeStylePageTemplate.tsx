import HeaderText from "../../atoms/HeaderText/HeaderText"
import styles from './LifeStylePageTemplate.module.scss'

const LifeStylePageTemplate = () => {
  return (
    <section className={`${styles.lifestyleContainer} sectionPages`}>
        <HeaderText >
          <h1>Lifestyle</h1>
        </HeaderText>
    </section>
  )
}

export default LifeStylePageTemplate