import styles from './Nav.module.scss'
import Logo from '../../components/atoms/logo/Logo'
import useWindowSize from '../../hooks/useWindowSize'
import DesktopNav from './desktopNav/DesktopNav'
import { dataNavigation } from './dataNavigation/dataNavigation'
import MobileNav from './mobileNav/MobileNav'
import SearchButton from '../../components/atoms/SearchButton/SearchButton'
import SearchContainer from '../../components/organism/SearchContainer/SearchContainer'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'


const Navigation = () => {
	const size = useWindowSize()
	

	const {isOpen} = useSelector((state:RootState)=> state.theme)
	

	return (
		<nav className={styles.container}>
			<Logo />
			{size.width > 900 ? <DesktopNav dataMenu={dataNavigation} /> : <MobileNav />}
			<SearchButton/>

			{isOpen && <SearchContainer isOpen={isOpen} />}
		</nav>
	)
}

export default Navigation
