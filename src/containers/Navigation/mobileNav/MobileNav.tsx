import { useLocation } from 'react-router'
import CloseButton from '../../../components/atoms/CloseButton/CloseButton'
import MenuElement from '../../../components/organism/menuElement/MenuElement'
import type { MenuTypes } from '../dataNavigation/dataNavigation'
import styles from './MobileNav.module.scss'
import { useEffect } from 'react'
import ControlPanel from '../../../components/organism/ControlPanel/ControlPanel'
import useMenuContext from '../../../hooks/useMenuContext'

interface MobileRefProps {
	dataMenu: MenuTypes[]
}

const MobileNav = ({ dataMenu }: MobileRefProps) => {
	const {handleOpenCloseMenu, mobileRef, navRef } = useMenuContext()
	const location = useLocation()
	
	useEffect(() => {
		if (location.pathname !== '/') {
			navRef.current?.classList.add(styles.secondNavBgColor)
		} else {
			navRef.current?.classList.remove(styles.secondNavBgColor)
		}
	}, [location.pathname, navRef])
	

	return (
		<div ref={mobileRef} className={styles.mobileContainer}>
			<div className={styles.mobileElement}>
				<CloseButton styles={styles} handleClose={handleOpenCloseMenu}/>
				<h2 className={styles.title}>Navigate to</h2>
			</div>
			<div className={styles.mobileLink}>
				<ControlPanel
					styles={styles}
					index={0}
					
				/>
				{dataMenu.map((item: MenuTypes, index: number) => {
					return (
						<MenuElement
							key={index}
							styles={styles}
							data={item}
							index={index}
							
						/>
					)
				})}
			</div>
		</div>
	)
}

export default MobileNav
