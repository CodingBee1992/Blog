import CloseSvg from '../../../assets/icons/nav/CloseSvg'

// import styles from './CloseButton.module.scss'

interface HandleCloseProps {
	styles: { [key: string]: string }
	handleClose: () => void
	ariaLabel?:string
}

const CloseButton = ({ styles, handleClose,ariaLabel }: HandleCloseProps) => {
	return (
		<button
		aria-label={ariaLabel}
			className={styles.close}
			onClick={() => {
				handleClose()
			}}>
			<CloseSvg styles={styles} />
		</button>
	)
}

export default CloseButton
