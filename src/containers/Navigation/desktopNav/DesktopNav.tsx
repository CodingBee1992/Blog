import MenuElement from '../../../components/organism/menuElement/MenuElement'
import type { Size } from '../../../types/types'
import type { MenuTypes } from '../dataNavigation/dataNavigation'
import styles from './DesktopNav.module.scss'
interface DesktopProps {
	size: Size
	dataMenu: MenuTypes[]
	
}

const DesktopNav = ({ size, dataMenu }: DesktopProps) => {
	return (
		<div className={styles.menu}>
			{size.width > 900
				? dataMenu.map((item: MenuTypes, index: number) => {
						return <MenuElement data={item} index={index}/>
				  })
				: null}
		</div>
	)
}

export default DesktopNav
