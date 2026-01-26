import { Outlet } from 'react-router'
import SideBar from '../../components/organism/SideBar/SideBar'

import styles from './AdminPanelLayout.module.scss'
import { MenuProvider } from '../../context/menuContext'
import { adminLinks } from '../../utils/sideBarLinks'

import SideBarLink from '../../components/atoms/SidebarLink/SideBarLink'
import useWindowSize from '../../hooks/useWindowSize'
import NavPanel from '../../components/atoms/NavPanel/NavPanel'

const AdminPanelLayout = () => {
	const size = useWindowSize()
	const isMobile = size.width < 800
	return (
		<MenuProvider>
			<div className={styles.adminPanelLayoutContainer}>
				{isMobile && <NavPanel />}
				<SideBar>
					{adminLinks.map((data, index) => (
						<SideBarLink key={index} data={data} index={index} />
					))}
				</SideBar>
				<Outlet />
			</div>
		</MenuProvider>
	)
}

export default AdminPanelLayout
