import type { ReactNode } from 'react'
import styles from './FormBtn.module.scss'
interface FormBtnProps {
	children: ReactNode
	type: 'submit' | 'button'
	isSubmitting?: boolean
	handleResetFields?: () => void
	className: string
}

const FormBtn = ({ children, isSubmitting, handleResetFields, className, type }: FormBtnProps) => {
	return (
		<button
			disabled={isSubmitting}
			type={type}
			onClick={() => handleResetFields?.()}
			className={` ${styles.postFormBtn} ${className ? className : ''}`}>
			{children}
		</button>
	)
}

export default FormBtn
