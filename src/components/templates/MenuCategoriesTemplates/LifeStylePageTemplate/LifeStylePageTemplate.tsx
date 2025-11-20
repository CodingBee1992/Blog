
import HeaderText from '../../../atoms/HeaderText/HeaderText'
import PostsContent from '../../../organism/PostsContent/PostsContent'
import styles from './LifeStylePageTemplate.module.scss'

const LifeStylePageTemplate = () => {
  return (
    <section className={`${styles.lifestyleContainer} sectionPages`}>
        <HeaderText >
          <h1>Lifestyle</h1>
        </HeaderText>
        <PostsContent/>
    </section>
  )
}

export default LifeStylePageTemplate