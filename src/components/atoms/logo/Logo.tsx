// import { useLocation, useNavigate } from 'react-router'
import useMenuContext from '../../../hooks/useMenuContext'
import AnchorLink from '../AnchorLink/AnchorLink'
interface LogoProps {
	styles: Record<string, string>
}
const Logo = ({ styles }: LogoProps) => {
	const { general } = useMenuContext()
	const logoSrc = typeof general?.logo?.src === 'string' ? general.logo.src : undefined
	return (
		<AnchorLink href="/" ariaLabel="Logo" className={styles.logo}>
			<img src={logoSrc} alt="Logo" />
		</AnchorLink>
	)
}

export default Logo
