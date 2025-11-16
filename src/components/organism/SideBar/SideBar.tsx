import {  type ReactNode } from 'react'

import styles from './SideBar.module.scss'
import {  useSelector } from 'react-redux'
import Logo from '../../atoms/logo/Logo'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import type { RootState } from '../../../store'
import SignOutBtn from '../../atoms/SingOutBtn/SignOutBtn'

interface SideBarProps {
	children: ReactNode
}

const AdminPanelSideBar = ({ children }: SideBarProps) => {
	
	const {isLogged,isAdmin, avatar } = useSelector((state: RootState) => state.auth)

	
	return (
		<div className={styles.sideBarContainer}>
			<div className={styles.sideBarMenu}>
				<Logo styles={styles} />
				{children}
			</div>
			<div className={styles.controlPanelUser}>
				{(!isLogged || (isLogged && isAdmin)) && <AnchorLink className={styles.controlLinks} href="/settings">
					Settings
				</AnchorLink>}

				
				<SignOutBtn styles={styles}/>
				<img src={`${avatar}`} alt="Avatar" className={styles.authorAvatar} />
			</div>
			
		</div>
	)
}

export default AdminPanelSideBar
