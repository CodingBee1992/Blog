import type { ReactNode } from 'react'
import styles from './APIResponseMessage.module.scss'

interface APIResponseMessageProps{
    children?:ReactNode
    className?:string
    responseMessage:string
    meesageType?:string
}

const APIResponseMessage = ({children,responseMessage,className,meesageType}:APIResponseMessageProps) => {
	return (
		<span className={`${styles.responseMessage} ${meesageType === 'error' ? styles.errorMessage : styles.successMessage} ${className ? className:''}`}>
			{children}
			{responseMessage}
		</span>
	)
}

export default APIResponseMessage
