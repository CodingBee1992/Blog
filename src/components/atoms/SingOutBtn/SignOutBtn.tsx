// import { useDispatch } from 'react-redux'
// import { useLogOutMutation } from '../../../slices/api/loginSlice'
// import { setLogout } from '../../../slices/api/authSlice'
// import { useNavigate } from 'react-router'
// import { useEffect } from 'react'

import useMenuContext from '../../../hooks/useMenuContext'

import type { ReactNode } from 'react'

interface SignOutBtnProps {
	children: ReactNode
	className: string
}

const SignOutBtn = ({ children, className }: SignOutBtnProps) => {
	// const dispatch = useDispatch()
	// const navigate = useNavigate()
	// const [logOut, { isSuccess }] = useLogOutMutation()
	
	const { signOut } = useMenuContext()

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


	return (
		<button
			className={className}
			onClick={() => {
				signOut()
			}}>
			{children}
		</button>
	)
}

export default SignOutBtn
