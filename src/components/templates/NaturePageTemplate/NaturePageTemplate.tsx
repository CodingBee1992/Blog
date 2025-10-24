import HeaderText from '../../atoms/HeaderText/HeaderText'
import PostsContent from '../../organism/PostsContent/PostsContent'
import styles from './NaturePageTemplate.module.scss'

const NaturePageTemplate = () => {
  return (
    <section className={`${styles.natureContainer} sectionPages`}>
        <HeaderText >
          <h1>Nature</h1>
        </HeaderText>
        <PostsContent/>
    </section>
  )
}

export default NaturePageTemplate