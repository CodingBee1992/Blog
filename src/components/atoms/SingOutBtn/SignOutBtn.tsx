// import { useDispatch } from 'react-redux'
// import { useLogOutMutation } from '../../../slices/api/loginSlice'
// import { setLogout } from '../../../slices/api/authSlice'
// import { useNavigate } from 'react-router'
// import { useEffect } from 'react'
import { useLocation } from 'react-router'
import useMenuContext from '../../../hooks/useMenuContext'

interface SignOutBtnProps {
	styles: Record<string, string>
}

const SignOutBtn = ({ styles }: SignOutBtnProps) => {
	// const dispatch = useDispatch()
	// const navigate = useNavigate()
	// const [logOut, { isSuccess }] = useLogOutMutation()
	const { pathname } = useLocation()
	const { signOut } = useMenuContext()
	console.log(pathname)

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		const timer = setTimeout(() => {
	// 			navigate('/')
	// 			window.scrollTo({ top: 0, behavior: 'instant' })
	// 		}, 300)

	// 		return () => clearTimeout(timer)
	// 	}
	// }, [isSuccess, navigate])

	// const signOut = async () => {
	// 	try {
	// 		const res = await logOut({}).unwrap()
	// 		console.log(res)

	// 		setTimeout(() => {
	// 			dispatch(setLogout())
	// 		}, 350)
	// 	} catch (error) {
	// 		console.log('Error during logout:', error)
	// 	}
	// }

	if (pathname.startsWith('/admin') || pathname.startsWith('/settings')) {
		return (
			<button
				className={styles.signOut}
				onClick={() => {
					signOut()
				}}>
				Majkel
			</button>
		)
	}

	return (
		<button
			className={styles.signOut}
			onClick={() => {
				signOut()
			}}>
			Sign Out
		</button>
	)
}

export default SignOutBtn
