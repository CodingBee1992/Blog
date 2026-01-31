import type { ReactNode } from 'react'
import styles from './APIResponseMessage.module.scss'
import { WarnSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'

interface APIResponseMessageProps{
    children?:ReactNode
    className?:string
    
    messageType?:string
}

const APIResponseMessage = ({children,className,messageType}:APIResponseMessageProps) => {
	return (
		<span className={`${styles.responseMessage} ${messageType === 'error' ? styles.errorMessage : styles.successMessage} ${className ? className:''}`}>
			{messageType === 'error' && <WarnSVG className={styles.warnSVG} />}
			{children}
			
		</span>
	)
}

export default APIResponseMessage
