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
import { useEffect } from 'react'
import MenuIcon from '../../components/atoms/MenuIcon/MenuIcon'
import ControlPanel from '../../components/organism/ControlPanel/ControlPanel'
import useMenuContext from '../../hooks/useMenuContext'

const Navigation = () => {
	const size = useWindowSize()

	// const userRef = useRef<HTMLDivElement>(null)
	const { navRef } = useMenuContext()

	const { isOpen } = useSelector((state: RootState) => state.theme)

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= 200) {
				navRef.current?.classList.add(styles.bgcNavBlack)
			} else {
				navRef.current?.classList.remove(styles.bgcNavBlack)
			}
		}

		document.addEventListener('scroll', handleScroll)

		return () => {
			document.removeEventListener('scroll', handleScroll)
		}
	}, [navRef])
	


	return (
		<nav ref={navRef} className={styles.container}>
			<Logo styles={styles} />
			{size.width > 900 ? (
				<DesktopNav navRef={navRef} dataMenu={dataNavigation} />
			) : (
				<MobileNav dataMenu={dataNavigation} />
			)}
			<div className={styles.panel}>
				<SearchButton />
				{size.width > 900 && <ControlPanel index={0} styles={styles} />}
			</div>
			{size.width <= 900 && <MenuIcon />}

			{isOpen && <SearchContainer isOpen={isOpen} />}
		</nav>
	)
}

export default Navigation
