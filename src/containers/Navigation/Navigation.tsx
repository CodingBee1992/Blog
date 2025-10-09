import styles from './Nav.module.scss'
import Logo from '../../components/atoms/logo/Logo'
import useWindowSize from '../../hooks/useWindowSize'
import DesktopNav from './desktopNav/DesktopNav'
import { dataNavigation } from './dataNavigation/dataNavigation'


const Navigation = () => {
	const size = useWindowSize()

	

	return (
		<nav className={styles.container}>
			<Logo />
			<DesktopNav size={size} dataMenu={dataNavigation} />
			
		</nav>
	)
}

export default Navigation
