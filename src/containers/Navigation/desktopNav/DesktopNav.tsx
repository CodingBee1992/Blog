import { useEffect, useRef, type RefObject } from 'react'
import MenuElement from '../../../components/organism/menuElement/MenuElement'

import type { MenuTypes } from '../dataNavigation/dataNavigation'
import styles from './DesktopNav.module.scss'
import { useLocation } from 'react-router'
interface DesktopProps {
	dataMenu: MenuTypes[]
	navRef: RefObject<HTMLDivElement | null>
}

const DesktopNav = ({ navRef, dataMenu }: DesktopProps) => {
	const menuRef = useRef<HTMLDivElement>(null)
	const location = useLocation()

	useEffect(() => {
		if (location.pathname !== '/') {
			navRef.current?.classList.add(styles.secondNavBgColor)
			menuRef.current?.classList.add(styles.navWrapper)
		} else {
			navRef.current?.classList.remove(styles.secondNavBgColor)
			menuRef.current?.classList.remove(styles.navWrapper)
		}
	}, [location.pathname, navRef])

	return (
		<div ref={menuRef} className={`${styles.menu} row`}>
			{dataMenu.map((item: MenuTypes, index: number) => {
				return <MenuElement data={item} index={index} />
			})}
		</div>
	)
}

export default DesktopNav
