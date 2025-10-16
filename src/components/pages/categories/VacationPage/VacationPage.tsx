import HeaderText from '../../../atoms/HeaderText/HeaderText'
import styles from './VacationPage.module.scss'
const VacationPage = () => {
  return (
    <div className={`${styles.vacationContainer} sectionPages`}>
      <HeaderText>
        <h1>Vacation</h1>
      </HeaderText>
    </div>
  )
}

export default VacationPage