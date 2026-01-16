import { useState, type ChangeEvent, type ReactNode } from 'react'
import InputShowHideButton from '../../atoms/InputShowHideButton/InputShowHideButton'

interface AccountInputBoxProps {
	children?: ReactNode
	styles: Record<string, string>
	onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
	label: string
	id: string
    value:string
	showPassword:boolean
}

const AccountInputBox = ({ children, styles, label,value,showPassword=false, id, onChangeInput }: AccountInputBoxProps) => {
	const [visible, setVisible] = useState<boolean>(false)

	return (
		<div className={styles.formBox}>
			<label htmlFor={id}>{label}</label>
			<div className={styles.formInput}>
				<input onChange={e => onChangeInput(e)} value={value} id={id} name={id} type={showPassword ? visible === false ? 'password' : 'text' : 'text'} />

				{showPassword && <InputShowHideButton visible={visible} onToggle={() => setVisible(v => !v)} />}
			</div>
			{children}
		</div>
	)
}

export default AccountInputBox
