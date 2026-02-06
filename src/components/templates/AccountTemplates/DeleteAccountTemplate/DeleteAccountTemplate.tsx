import DeleteAccount from '../../../organism/DeleteAccount/DeleteAccount'
import styles from './DeleteAccountTemplate.module.scss'
const DeleteAccountTemplate = () => {
	return (
		<div className={styles.deleteAccountContainer}>
			<DeleteAccount />
		</div>
	)
}

export default DeleteAccountTemplate
