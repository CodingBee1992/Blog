import { useEffect, type ReactNode } from 'react'

import styles from './SideBar.module.scss'
// import ControlPanelUser from '../../atoms/ControlPanelUser/ControlPanelUser'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useLogOutMutation } from '../../../slices/api/loginSlice'
import { setLogout } from '../../../slices/api/authSlice'
import Logo from '../../atoms/logo/Logo'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import type { RootState } from '../../../store'

interface SideBarProps {
	children: ReactNode
}

const AdminPanelSideBar = ({ children }: SideBarProps) => {
	// const userRef = useRef<HTMLDivElement>(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [logOut, { isSuccess }] = useLogOutMutation()
	const {isLogged,isAdmin, avatar } = useSelector((state: RootState) => state.auth)


	useEffect(() => {
		if (isSuccess) {
			const timer = setTimeout(() => {
				navigate('/')
				window.scrollTo({ top: 0, behavior: 'instant' })
			}, 300)

			return () => clearTimeout(timer)
		}
	}, [isSuccess, navigate])

	const signOut = async () => {
		
		try {
			await logOut({})
			dispatch(setLogout())
		} catch (error) {
			console.log('Error during logut:', error)
		}
	}
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

				<button
					className={styles.signOut}
					onClick={() => {
						signOut()
					}}>
					Sign Out
				</button>
				<img src={`${avatar}`} alt="Avatar" className={styles.authorAvatar} />
			</div>
			
		</div>
	)
}

export default AdminPanelSideBar
