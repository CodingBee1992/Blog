import { type ReactNode } from 'react'

import styles from './SideBar.module.scss'
import { useSelector } from 'react-redux'
import Logo from '../../atoms/logo/Logo'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import type { RootState } from '../../../store'
import SignOutBtn from '../../atoms/SingOutBtn/SignOutBtn'

import LogoutSvg from '../../../assets/icons/logout/LogoutSvg'
import { useLocation } from 'react-router'
import { DashboardSVG, ProfileSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import { accountLinks, adminLinks } from '../../../utils/sideBarLinks'

interface SideBarProps {
	children: ReactNode
}

const SideBar = ({ children }: SideBarProps) => {
	const { pathname } = useLocation()
	const { isLogged, role, avatar } = useSelector((state: RootState) => state.auth)

	const admin = adminLinks[0].href
	const account = accountLinks[0].children![0].href

	return (
		<div className={styles.sideBarContainer}>
			<div className={styles.sideBarMenu}>
				<Logo styles={styles} />
				<div className={styles.sideBarLinks}>{children}</div>
			</div>
			<div className={styles.controlPanelUser}>
				{role === 'User' ? (
					''
				) : !pathname.startsWith('/account') ? (
					(!isLogged || (isLogged && (role === 'Admin' || role === 'Moderator'))) && (
						<AnchorLink title="Account" ariaLabel="Account" className={styles.sideBarBtns} href={account}>
							<ProfileSVG className={styles.profileIcon} />
						</AnchorLink>
					)
				) : (
					<AnchorLink ariaLabel="Admin Panel" href={admin} className={styles.sideBarBtns} title="Admin Panel">
						<DashboardSVG className={styles.dashboardIcon} />
					</AnchorLink>
				)}

				<SignOutBtn ariaLabel="Sign Out button" className={styles.sideBarBtns}>
					<LogoutSvg styles={styles} />
				</SignOutBtn>
				<img title="Avatar" src={`${avatar}`} alt="Avatar" className={styles.authorAvatar} />
			</div>
		</div>
	)
}

export default SideBar
