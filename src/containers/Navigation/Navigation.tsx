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
import { useRef, useState } from 'react'
import MenuIcon from '../../components/atoms/MenuIcon/MenuIcon'

const Navigation = () => {
	const size = useWindowSize()
	const navRef = useRef<HTMLDivElement>(null)
	const mobileRef = useRef<HTMLDivElement>(null)
	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(true)
	const { isOpen } = useSelector((state: RootState) => state.theme)

	const handleOpenCloseMenu = () => {
		setIsOpenMenu(!isOpenMenu)

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
				<MobileNav mobileRef={mobileRef} handleCloseMenu={handleOpenCloseMenu} dataMenu={dataNavigation}/>
			)}
			<SearchButton />
			{size.width <= 900 ? <MenuIcon handleOpenMenu={handleOpenCloseMenu} /> : null}

			{isOpen && <SearchContainer isOpen={isOpen} />}
		</nav>
	)
}

export default Navigation
