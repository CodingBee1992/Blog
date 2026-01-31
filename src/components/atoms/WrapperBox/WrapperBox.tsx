import type { ReactNode } from "react"
import styles from './WrapperBox.module.scss'
interface WrapperBoxProps{
    children: ReactNode
}

const WrapperBox = ({ children }:WrapperBoxProps) => {
	return <div className={styles.wrapperBox}>{children}</div>
}

export default WrapperBox
