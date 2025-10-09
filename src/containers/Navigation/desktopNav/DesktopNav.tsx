import MenuElement from '../../../components/organism/menuElement/MenuElement'

import type { MenuTypes } from '../dataNavigation/dataNavigation'
import styles from './DesktopNav.module.scss'
interface DesktopProps {

	dataMenu: MenuTypes[]
}

const DesktopNav = ({ dataMenu }: DesktopProps) => {
	return (
		<div className={styles.menu}>
			{dataMenu.map((item: MenuTypes, index: number) => {
				return <MenuElement data={item} index={index} />
			})}
		</div>
	)
}

export default DesktopNav
