import { Navigate, Outlet } from 'react-router'
import SideBar from '../../components/organism/SideBar/SideBar'
import styles from './SettingsLayout.module.scss'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { MenuProvider } from '../../context/menuContext'
import { settingsLinks } from '../../utils/sideBarLinks'
import SideBarLink from '../../components/atoms/SidebarLink/SideBarLink'
const SettingsLayout = () => {
	const { isLogged } = useSelector((state: RootState) => state.auth)

	if (!isLogged) return <Navigate to="/" />

	return (
		<MenuProvider>
			<div className={styles.settingLayoutContainer}>
				<SideBar>
					{settingsLinks.map((data,index)=>(
						<SideBarLink key={index} data={data} index={index}/>
					))}
				</SideBar>
				<Outlet />
			</div>
		</MenuProvider>
	)
}

export default SettingsLayout
