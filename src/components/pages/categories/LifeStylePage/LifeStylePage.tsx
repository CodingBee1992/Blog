import HeaderText from '../../../atoms/HeaderText/HeaderText'
import styles from './LifeStylePage.module.scss'

const LifeStylePage = () => {
  return (
    <div className={`${styles.lifestyleContainer} sectionPages`}>
        <HeaderText >
          <h1>Lifestyle</h1>
        </HeaderText>
    </div>
  )
}

export default LifeStylePage