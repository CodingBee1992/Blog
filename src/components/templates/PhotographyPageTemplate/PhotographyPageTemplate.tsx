
import HeaderText from '../../atoms/HeaderText/HeaderText'
import styles from './PhotographyPageTemplate.module.scss'
const PhotographyPageTemplate = () => {
  return (
    <section className={`${styles.photographyContainer} sectionPages`}>
      <HeaderText>
        <h1>Photography</h1>
      </HeaderText>
    </section>
  )
}

export default PhotographyPageTemplate