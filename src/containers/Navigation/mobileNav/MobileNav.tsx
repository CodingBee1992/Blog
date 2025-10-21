import { useLocation } from 'react-router'
import CloseButton from '../../../components/atoms/CloseButton/CloseButton'
import MenuElement from '../../../components/organism/menuElement/MenuElement'
import type { MenuTypes } from '../dataNavigation/dataNavigation'
import styles from './MobileNav.module.scss'
import { useEffect, type MouseEvent, type RefObject } from 'react'

interface MobileRefProps {
	mobileRef: RefObject<HTMLDivElement | null>
	navRef: RefObject<HTMLDivElement | null>
	handleCloseMenu: () => void
	dataMenu: MenuTypes[]
}

const MobileNav = ({ dataMenu, mobileRef, navRef, handleCloseMenu }: MobileRefProps) => {
	const location = useLocation()
	useEffect(() => {
		if (location.pathname !== '/') {
			navRef.current?.classList.add(styles.secondNavBgColor)
		} else {
			navRef.current?.classList.remove(styles.secondNavBgColor)
		}
	}, [location.pathname, navRef])
	const handleOpenCloseDropdown = (e: MouseEvent<HTMLElement>, index: number) => {
		const target = e.currentTarget as HTMLElement
		let element

		if (Number(target.dataset.element) === index) {
			element = target

			if (!element.classList.contains(styles.active)) {
				const activeElements = document.querySelectorAll(`.${styles.active}`)

				if (activeElements) {
					activeElements.forEach(item => {
						item.classList.remove(styles.active)
					})
				}

				element.classList.add(styles.active)
				mobileRef.current?.classList.add(styles.overflowActive)
			} else {
				element.classList.remove(styles.active)
				mobileRef.current?.classList.remove(styles.overflowActive)
			}
		}
	}

	return (
		<div ref={mobileRef} className={styles.mobileContainer}>
			<div className={styles.mobileElement}>
				<CloseButton styles={styles} handleClose={() => handleCloseMenu()} />
				<h2 className={styles.title}>Navigate to</h2>
			</div>
			<div className={styles.mobileLink}>
				{dataMenu.map((item: MenuTypes, index: number) => {
					return (
						<MenuElement key={index} styles={styles} data={item} index={index} handleOpenCloseDropdown={handleOpenCloseDropdown} />
					)
				})}
			</div>
		</div>
	)
}

export default MobileNav
