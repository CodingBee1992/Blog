import {  Outlet } from 'react-router'
import SideBar from '../../components/organism/SideBar/SideBar'
import styles from './AccountLayout.module.scss'

import { MenuProvider } from '../../context/menuContext'
import { accountLinks } from '../../utils/sideBarLinks'
import SideBarLink from '../../components/atoms/SidebarLink/SideBarLink'

const AccountLayout = () => {
	

	return (
		<MenuProvider>
			<div className={styles.accountLayoutContainer}>
				<SideBar>
					{accountLinks.map((data, index) => (
						<SideBarLink key={index} data={data} index={index} />
					))}
				</SideBar>
				<Outlet />
			</div>
		</MenuProvider>
	)
}

export default AccountLayout
