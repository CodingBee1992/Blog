import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { useEffect, type MouseEvent, type RefObject } from 'react'
import { setLogout } from '../../../slices/api/authSlice'
import { useLogOutMutation } from '../../../slices/api/loginSlice'
import { useNavigate } from 'react-router'

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
	const { isLogged, name, avatar } = useSelector((state: RootState) => state.auth)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [logOut, { isSuccess }] = useLogOutMutation()
	const isAdmin = true

	useEffect(() => {
		if (isSuccess) {
			const timer = setTimeout(() => {
				navigate('/')
				window.scrollTo(0,0)
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
				<>
					<button onClick={() => openCloseUserMenu?.()} className={styles.signInBtn}>
						Sign In
					</button>
					
						<div ref={userRef} className={styles.controlContainer}>
							<AnchorLink className={styles.anchorLink} href="/login">
								Sign In
							</AnchorLink>
							<div className={styles.signUpContainer}>
								<span className={styles.signUpSpan}>Don't have an Account?</span>
								<AnchorLink className={styles.anchorLink} href="/registration">
									Sign Up
								</AnchorLink>
							</div>
						</div>
					
				</>
			) : (
				<>
					<div className={styles.authorInfo} onClick={() => openCloseUserMenu?.()}>
						<img src={avatar} alt="" className={styles.authorAvatar} />
						<span className={styles.author}>{name}</span>
					</div>
					<div ref={userRef} className={styles.controlSettings}>
						{isAdmin && (
							<AnchorLink className={styles.controlLinks} href="/dashboard">
								Dashboard
							</AnchorLink>
						)}
						<AnchorLink className={styles.controlLinks} href="/settings">
							Settings
						</AnchorLink>

						<button
							className={styles.signOut}
							onClick={() => {
								signOut()
							}}>
							Sign Out
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default ControlPanel
