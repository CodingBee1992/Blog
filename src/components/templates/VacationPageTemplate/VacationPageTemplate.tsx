
import HeaderText from '../../atoms/HeaderText/HeaderText'
import styles from './VacationPageTemplate.module.scss'
const VacationPageTemplate = () => {
  return (
     <section className={`${styles.vacationContainer} sectionPages`}>
      <HeaderText>
        <h1>Vacation</h1>
      </HeaderText>
    </section>
  )
}

export default VacationPageTemplate