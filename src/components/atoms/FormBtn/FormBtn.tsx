import type { ReactNode } from 'react'
import styles from './FormBtn.module.scss'
interface FormBtnProps {
	children: ReactNode
	type: 'submit' | 'button'
	isSubmitting?: boolean
	handleResetFields?: () => void
	handleResend?: () => void
	className: string
}

const FormBtn = ({ children, isSubmitting, handleResetFields,handleResend, className, type }: FormBtnProps) => {
	return (
		<button
			type={type}
			disabled={isSubmitting}
			onClick={() => {
				handleResetFields?.()
				handleResend?.()
			}}
			className={` ${styles.postFormBtn} ${className ? className : ''}`}>
			{children}
		</button>
	)
}

export default FormBtn
