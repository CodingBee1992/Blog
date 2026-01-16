
import styles from './InputShowHideButton.module.scss'
import { ViewsSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'

interface InputShowHideButtonProps {
	visible?: boolean
	className?: string
	onToggle: ()=>void
    disabled?:boolean
}

const InputShowHideButton = ({ visible=false,disabled=false, onToggle, className }: InputShowHideButtonProps) => {
	return (
		<button
			className={`${styles.switchVisibility} ${visible ? '' : styles.displayVisibility} ${className ? className : ''}`}
			type="button"
            disabled={disabled}
			aria-label={visible ? 'Hide password' : 'Show password'}
			onClick={() => onToggle()}>
			<ViewsSVG />
		</button>
	)
}

export default InputShowHideButton
