import { useState, type ChangeEvent, type ReactNode } from 'react'
import InputShowHideButton from '../../atoms/InputShowHideButton/InputShowHideButton'
import styles from './AccountInputBox.module.scss'
interface AccountInputBoxProps {
	children?: ReactNode
	onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
	label: string
	id: string
	value: string
	isSubmitting?: boolean
	type: 'text' | 'password' | 'email' | 'number' 
	className?:string
	placeholder?:string
}

const AccountInputBox = ({
	children,
	className,
	label,
	value,
	type,
	isSubmitting = false,
	id,
	placeholder,
	onChangeInput,
}: AccountInputBoxProps) => {
	const [visible, setVisible] = useState<boolean>(false)

	return (
		<div className={`${styles.formBox} ${className ? className :''}`}>
			<label htmlFor={id}>{label}</label>
			<div className={styles.formInput}>
				<input
					onChange={e => onChangeInput(e)}
					value={value}
					id={id}
					name={id}
					type={type === 'password' ? (visible === false ? type : 'text') : type}
					readOnly={isSubmitting}
					aria-readonly={isSubmitting}
					placeholder={placeholder}
				/>	

				{type === 'password' && <InputShowHideButton visible={visible} onToggle={() => setVisible(v => !v)} />}
			</div>
			{children}
		</div>
	)
}

export default AccountInputBox
