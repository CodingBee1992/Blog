import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { useEffect, type MouseEvent } from 'react'
import { setLogout } from '../../../slices/api/authSlice'
import { useLogOutMutation } from '../../../slices/api/loginSlice'
import { useNavigate } from 'react-router'

interface ControlPanelProps {
	styles: Record<string, string>
	index: number
	handleOpenCloseDropdown?: (e: MouseEvent<HTMLElement>, index: number) => void
	handleCloseMenu?: () => void
}

const ControlPanel = ({ styles, index, handleOpenCloseDropdown, handleCloseMenu }: ControlPanelProps) => {
	const { isLogged, name, avatar } = useSelector((state: RootState) => state.auth)
	
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [logOut, { isSuccess }] = useLogOutMutation()
	const isAdmin = true
	console.log(isSuccess)

	useEffect(() => {
		if (isSuccess) {
			const timer = setTimeout(() => {
				navigate('/')
			}, 1000)

			return () => clearTimeout(timer)
		}
		
	}, [isSuccess, navigate])

	const signOut = async () => {
		handleCloseMenu?.()
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
					<button className={styles.signInBtn}>Sign In</button>
					<div className={styles.controlContainer}>
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
					<div className={styles.authorInfo}>
						<img src={avatar} alt="" className={styles.authorAvatar} />
						<span className={styles.author}>{name}</span>
					</div>
					<div className={styles.controlSettings}>
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
