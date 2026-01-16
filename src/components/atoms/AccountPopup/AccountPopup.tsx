import styles from './AccountPopup.module.scss'
import CloseButton from '../CloseButton/CloseButton'
import { WarnSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import APIResponseMessage from '../APIResponseMessage/APIResponseMessage'
import type { Dispatch, SetStateAction } from 'react'
interface AccountPopupProps {
	// handleAccountPopup: () => void
	popupEmail: string
	handleSendEmail: () => void,
	setAccountPopup:Dispatch<SetStateAction<boolean>>,
	setIsEmail:Dispatch<SetStateAction<string>>
	popupTitle: string
	popupErrorMessage: string
	popupSuccessMessage: string
}

const AccountPopup = ({
	popupTitle,
	popupErrorMessage,
	popupSuccessMessage,
	popupEmail,
	setIsEmail,
	handleSendEmail,
	setAccountPopup,
}: AccountPopupProps) => {

	const handleAccountPopup =()=>{
		setAccountPopup(false)
		setIsEmail('')
	}
	return (
		<div className={styles.popupContainer}>
			<div className={styles.popupWrapper}>
				<p className={styles.popupTitle}>{popupTitle}</p>

				<p className={styles.sendInfo}>
					Send a verification link to <span>{popupEmail}</span>.
				</p>
				{popupSuccessMessage && (
					<APIResponseMessage responseMessage={popupSuccessMessage} meesageType="succes" className={styles.popupMessage}></APIResponseMessage>
				)}
				{popupErrorMessage && (
					<APIResponseMessage
						responseMessage={popupErrorMessage}
						className={styles.popupMessage}
						meesageType="error">
						<WarnSVG className={styles.warnSVG} />
					</APIResponseMessage>
				)}
				<button
					aria-label="Send button"
					className={`${styles.popupBtn} ${styles.sendPopupBtn}`}
					onClick={() => handleSendEmail()}>
					Send Link
				</button>
				<div className={styles.footerLine}></div>
				<button
					aria-label="Cancel button"
					className={`${styles.popupBtn} ${styles.cancelPopupBtn}`}
					onClick={() => handleAccountPopup()}>
					Cancel
				</button>
				<CloseButton ariaLabel="Close popup button" styles={styles} handleClose={handleAccountPopup} />
			</div>
		</div>
	)
}

export default AccountPopup
