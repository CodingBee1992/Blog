import ResetPassword from '../../../organism/ResetPassword/ResetPassword'
import styles from './ResetPasswordTemplate.module.scss'

const ResetPasswordTemplate = () => {
	return (
		<div className={styles.resetPasswordTemplateContainer}>
			<h3 className={styles.title}>Reset password</h3>
			<ResetPassword />
		</div>
	)
}

export default ResetPasswordTemplate
