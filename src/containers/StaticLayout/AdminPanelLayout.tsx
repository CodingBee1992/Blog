import { Outlet } from 'react-router'
import SideBar from '../../components/organism/SideBar/SideBar'

import styles from './AdminPanelLayout.module.scss'
import { MenuProvider } from '../../slices/menuContext'
const AdminPanelLayout = () => {
	return (
		<MenuProvider>
			<div className={styles.adminPanelLayoutContainer}>
				<SideBar>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					<div>Rico</div>
					
				</SideBar>
				<Outlet />
			</div>
		</MenuProvider>
	)
}

export default AdminPanelLayout
