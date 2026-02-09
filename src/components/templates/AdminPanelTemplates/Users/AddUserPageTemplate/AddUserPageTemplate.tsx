
import AddUserForm from '../../../../organism/AddUserForm/AddUserForm'
import styles from './AddUserPageTemplate.module.scss'

const AddUserPageTemplate = () => {
  return (
    <div className={styles.addUserContainer}>
        <AddUserForm/>
    </div>
  )
}

export default AddUserPageTemplate