import { Navigate, Outlet } from 'react-router'
import SideBar from '../../components/organism/SideBar/SideBar'
import styles from './SettingsLayout.module.scss'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
const SettingsLayout = () => {
    const {isLogged} = useSelector((state:RootState)=>state.auth)

    if(!isLogged) return <Navigate to='/' />


	return (
		<div className={styles.settingLayoutContainer}>
			<SideBar>
				<div>Rico</div>
			</SideBar>
			<Outlet />
		</div>
	)
}

export default SettingsLayout
