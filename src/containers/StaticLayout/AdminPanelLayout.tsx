import { Outlet } from 'react-router'
import SideBar from '../../components/organism/SideBar/SideBar'

import styles from './AdminPanelLayout.module.scss'
const AdminPanelLayout = () => {
	return (
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
				<div>Rico</div>
				<div>Rico</div>
				<div>Rico</div>
				<div>Rico</div>
				<div>Rico</div>
				<div>Rico</div>
			</SideBar>
			<Outlet />
		</div>
	)
}

export default AdminPanelLayout
