import styles from './SwitchButton.module.scss'

interface SwitchButtonProps {
	switchButton: boolean
	isSubmitting: boolean
}

const SwitchButton = ({ switchButton, isSubmitting }: SwitchButtonProps) => {
	return (
		<div className={`${styles.switchButton} ${switchButton ? styles.switch : ''}`} aria-label='Mode On or Off'>
			<button disabled={isSubmitting}  aria-pressed={!switchButton} className={styles.off}>
				Off
			</button>
			<button disabled={isSubmitting}  aria-pressed={switchButton} className={styles.on}>
				On
			</button>
		</div>
	)
}

export default SwitchButton
