
import useMenuContext from '../../../hooks/useMenuContext'

import type { ReactNode } from 'react'

interface SignOutBtnProps {
	children: ReactNode
	className: string
	ariaLabel?:string
}

const SignOutBtn = ({ children, className,ariaLabel }: SignOutBtnProps) => {
	
	
	const { signOut } = useMenuContext()

	return (
		<button
		title='Sign Out'
		aria-label={ariaLabel}
			className={className}
			onClick={() => {
				signOut()
			}}>
			{children}
		</button>
	)
}

export default SignOutBtn
