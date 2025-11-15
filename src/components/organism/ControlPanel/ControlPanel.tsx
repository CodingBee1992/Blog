import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../store'

import { useEffect, type MouseEvent, type RefObject } from 'react'
import { setLogout } from '../../../slices/api/authSlice'
import { useLogOutMutation } from '../../../slices/api/loginSlice'
import { useNavigate } from 'react-router'
import ControlPanelSignIn from '../../atoms/ControlPanelSignIn/ControlPanelSignIn'
import ControlPanelUser from '../../atoms/ControlPanelUser/ControlPanelUser'

interface ControlPanelProps<T extends HTMLElement> {
	styles: Record<string, string>
	index: number
	userRef?: RefObject<T | null>
	handleOpenCloseDropdown?: (e: MouseEvent<HTMLElement>, index: number) => void
	handleCloseMenu?: () => void
	openCloseUserMenu?: () => void
}

const ControlPanel = <T extends HTMLDivElement>({
	styles,
	index,
	userRef,
	handleOpenCloseDropdown,
	handleCloseMenu,
	openCloseUserMenu,
}: ControlPanelProps<T>) => {
	const { isLogged } = useSelector((state: RootState) => state.auth)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [logOut, { isSuccess }] = useLogOutMutation()
	

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
		handleCloseMenu?.()
		openCloseUserMenu?.()
		try {
			await logOut({})
			dispatch(setLogout())
		} catch (error) {
			console.log('Error during logut:', error)
		}
	}

	return (
		<div
			className={styles.controlPanelContainer}
			data-element={index}
			onClick={e => handleOpenCloseDropdown?.(e, index)}>
			{!isLogged ? (
				<ControlPanelSignIn styles={styles} openCloseUserMenu={openCloseUserMenu} userRef={userRef} />
			) : (
				<ControlPanelUser styles={styles} userRef={userRef} openCloseUserMenu={openCloseUserMenu} signOut={signOut} />
				
			)}
		</div>
	)
}

export default ControlPanel
