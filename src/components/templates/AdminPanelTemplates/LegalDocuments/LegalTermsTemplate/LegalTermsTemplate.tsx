import LegalTerms from '../../../../organism/LegalTerms/LegalTerms'
import styles from './LegalTermsTemplate.module.scss'

const LegalTermsTemplate = () => {
  return (
    <div className={styles.legalTermsContainer}>
      <LegalTerms/>
    </div>
  )
}

export default LegalTermsTemplate