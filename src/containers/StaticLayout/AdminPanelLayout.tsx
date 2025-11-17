import { Outlet } from 'react-router'
import SideBar from '../../components/organism/SideBar/SideBar'

import styles from './AdminPanelLayout.module.scss'
import { MenuProvider } from '../../slices/menuContext'
import { adminLinks } from '../../utils/sideBarLinks'

import SideBarLink from '../../components/atoms/SidebarLink/SideBarLink'
const AdminPanelLayout = () => {
	return (
		<MenuProvider>
			<div className={styles.adminPanelLayoutContainer}>
				<SideBar>
					{adminLinks.map(({icon,linkName,href},index)=>(
						<SideBarLink key={index} icon={icon} linkName={linkName} href={href}/>
					))}
					
					
				</SideBar>
				<Outlet />
			</div>
		</MenuProvider>
	)
}

export default AdminPanelLayout
