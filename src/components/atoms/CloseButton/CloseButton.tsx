import { CloseSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'

interface HandleCloseProps {
	styles: { [key: string]: string }
	handleClose: () => void
	ariaLabel?: string
}

const CloseButton = ({ styles, handleClose, ariaLabel }: HandleCloseProps) => {
	return (
		<button
			type="button"
			aria-label={ariaLabel}
			className={styles.close}
			onClick={() => {
				handleClose()
			}}>
			<CloseSVG className={styles.closeSVG}/>
		</button>
	)
}

export default CloseButton
