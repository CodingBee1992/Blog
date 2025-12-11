import { type ReactNode } from 'react'

import styles from './SideBar.module.scss'
import { useSelector } from 'react-redux'
import Logo from '../../atoms/logo/Logo'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import type { RootState } from '../../../store'
import SignOutBtn from '../../atoms/SingOutBtn/SignOutBtn'
import SettingsSvg from '../../../assets/icons/settings/SettingsSvg'
import LogoutSvg from '../../../assets/icons/logout/LogoutSvg'

interface SideBarProps {
	children: ReactNode
}

const SideBar = ({ children }: SideBarProps) => {
	const { isLogged, role, avatar } = useSelector((state: RootState) => state.auth)

	return (
		<div className={styles.sideBarContainer}>
			<div className={styles.sideBarMenu}>
				<Logo styles={styles} />
				<div className={styles.sideBarLinks}>{children}</div>
			</div>
			<div className={styles.controlPanelUser}>
				{(!isLogged || (isLogged && (role === 'Admin' || role === 'Moderator'))) && (
					<AnchorLink className={styles.sideBarBtns} href="/settings">
						<SettingsSvg styles={styles} />
					</AnchorLink>
				)}

				<SignOutBtn className={styles.sideBarBtns}>
					<LogoutSvg styles={styles} />
				</SignOutBtn>
				<img src={`${avatar}`} alt="Avatar" className={styles.authorAvatar} />
			</div>
		</div>
	)
}

export default SideBar
