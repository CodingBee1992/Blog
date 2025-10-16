import HeaderText from '../../../atoms/HeaderText/HeaderText'
import styles from './FamilyPage.module.scss'

const FamilyPage = () => {
  return (
    <div className={`${styles.familyContainer} sectionPages`}>
        <HeaderText>
          <h1>Family</h1>
        </HeaderText>
    </div>
  )
}

export default FamilyPage