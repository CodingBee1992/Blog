import CloseButton from '../../../components/atoms/CloseButton/CloseButton'
import MenuElement from '../../../components/organism/menuElement/MenuElement'
import type { MenuTypes } from '../dataNavigation/dataNavigation'
import styles from './MobileNav.module.scss'
import { type MouseEvent, type RefObject } from 'react'

interface MobileRefProps {
	mobileRef: RefObject<HTMLDivElement | null>
	handleCloseMenu: () => void
	dataMenu: MenuTypes[]
}

const MobileNav = ({ dataMenu, mobileRef, handleCloseMenu }: MobileRefProps) => {
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
						<MenuElement styles={styles} data={item} index={index} handleOpenCloseDropdown={handleOpenCloseDropdown} />
					)
				})}
			</div>
		</div>
	)
}

export default MobileNav
