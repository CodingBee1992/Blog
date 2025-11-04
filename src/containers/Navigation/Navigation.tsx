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
import { useEffect, useRef} from 'react'
import MenuIcon from '../../components/atoms/MenuIcon/MenuIcon'
import ControlPanel from '../../components/organism/ControlPanel/ControlPanel'

const Navigation = () => {
	const size = useWindowSize()
	const navRef = useRef<HTMLDivElement>(null)
	const mobileRef = useRef<HTMLDivElement>(null)
	// const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
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
	}, [])
	const handleOpenCloseMenu = () => {
		
		if (!mobileRef.current?.classList.contains(styles.showHide)) {
			mobileRef.current?.classList.add(styles.showHide)

			setTimeout(() => {
				mobileRef.current?.classList.add(styles.fadeIn)
			}, 100)
		} else {
			mobileRef.current?.classList.remove(styles.fadeIn)

			setTimeout(() => {
				mobileRef.current?.classList.remove(styles.showHide)
			}, 500)
		}
	}


	return (
		<nav ref={navRef} className={styles.container}>
			<Logo />
			{size.width > 900 ? (
				<DesktopNav navRef={navRef} dataMenu={dataNavigation} />
			) : (
				<MobileNav
					navRef={navRef}
					mobileRef={mobileRef}
					handleCloseMenu={handleOpenCloseMenu}
					dataMenu={dataNavigation}
				/>
			)}
			<div className={styles.panel}>
				<SearchButton />
				{size.width > 900 && <ControlPanel index={0} styles={styles}  />}
			</div>
			{size.width <= 900 && <MenuIcon handleOpenMenu={handleOpenCloseMenu} />}

			{isOpen && <SearchContainer isOpen={isOpen} />}
		</nav>
	)
}

export default Navigation
