import { NavLink } from 'react-router'
import Logo from '../../atoms/logo/Logo'

const Navigation = () => {
	return (
		<div>
			<NavLink to={'/'} aria-label="codingBee-logo">
				<Logo />
			</NavLink>
			
		</div>
	)
}

export default Navigation
