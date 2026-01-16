import type { ReactNode } from "react"
import styles from './ProfileInfoBox.module.scss'
interface ProfileInfoBox{
    children: ReactNode
}

const ProfileInfoBox = ({ children }:ProfileInfoBox) => {
	return <div className={styles.profileInfoBox}>{children}</div>
}

export default ProfileInfoBox
