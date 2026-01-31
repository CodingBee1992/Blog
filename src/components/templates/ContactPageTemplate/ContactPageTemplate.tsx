import ContactForm from '../../organism/ContactForm/ContactForm'
import styles from './ContactPageTemplate.module.scss'

const ContactPageTemplate = () => {
  return (
    <div className={styles.contactPageTemplateContainer}>
        
        <ContactForm/>
    </div>
  )
}

export default ContactPageTemplate