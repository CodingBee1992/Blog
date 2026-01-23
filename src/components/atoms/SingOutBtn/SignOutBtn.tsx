import useMenuContext from '../../../hooks/useMenuContext'

import type { ReactNode } from 'react'

interface SignOutBtnProps {
	children: ReactNode
	className: string
	ariaLabel?: string
}

const SignOutBtn = ({ children, className, ariaLabel }: SignOutBtnProps) => {
	const { signOut, mobileMenu,openCloseUserMenu } = useMenuContext()
	const { toggle } = mobileMenu
	return (
		<button
			title="Sign Out"
			aria-label={ariaLabel}
			className={className}
			onClick={() => {
				signOut()
				toggle()
				openCloseUserMenu()
			}}>
			{children}
		</button>
	)
}

export default SignOutBtn
