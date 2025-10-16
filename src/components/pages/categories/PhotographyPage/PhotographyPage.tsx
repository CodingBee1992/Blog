import HeaderText from '../../../atoms/HeaderText/HeaderText'
import styles from './PhotographyPage.module.scss'

const PhotographyPage = () => {
  return (
    <div className={`${styles.photographyContainer} sectionPages`}>
      <HeaderText>
        <h1>Photography</h1>
      </HeaderText>
    </div>
  )
}

export default PhotographyPage