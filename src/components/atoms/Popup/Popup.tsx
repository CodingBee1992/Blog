import CloseButton from '../CloseButton/CloseButton'
import styles from './Popup.module.scss'
import { type ReactNode, type RefObject } from 'react'
interface PopupProps {
	children: ReactNode
	popupRef: RefObject<HTMLDivElement | null>
	handleClosePopup: () => void
	popUpMessage: string
	handleDelete: () => void
	popupTitle: string
}
const Popup = ({ children, popupTitle, popupRef, popUpMessage, handleClosePopup, handleDelete }: PopupProps) => {
	return (
		<div ref={popupRef} className={styles.popupContainer}>
			<div className={styles.popupWrapper}>
				<p className={styles.popupTitle}>{popupTitle}</p>
				{children}
				<div className={styles.popupFooter}>
					<p className={styles.deleteInfo}> {popUpMessage || `Do you want to ${popupTitle} ?`}</p>
					<button
						aria-label={popUpMessage ? 'Close button' : 'Delete button'}
						className={`${styles.popupBtn} ${popUpMessage ? styles.closePopupBtn : styles.deleteBtn}`}
						onClick={popUpMessage ? handleClosePopup : handleDelete}>
						{popUpMessage ? 'Close ' : 'Delete'}
					</button>
				</div>
				<CloseButton ariaLabel="Close popup button" styles={styles} handleClose={handleClosePopup} />
			</div>
		</div>
	)
}

export default Popup
