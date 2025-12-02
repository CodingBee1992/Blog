import type { MenuTypes } from '../../../containers/Navigation/dataNavigation/dataNavigation'
import useMenuContext from '../../../hooks/useMenuContext'
import AnchorLink from '../AnchorLink/AnchorLink'
import { useLocation } from 'react-router'

// import styles from './DropdownMenu.module.scss'

interface DropdownMenuProps {
	data: MenuTypes
	handleMouseInDropdown?: (e: React.MouseEvent<HTMLElement>) => void
	handleMouseOutDropdown?: (e: React.MouseEvent<HTMLElement>) => void
	styles: { [key: string]: string }
}

const DropdownMenu = ({
	data,
	styles,

	handleMouseInDropdown,
	handleMouseOutDropdown,
}: DropdownMenuProps) => {
	const { pathname } = useLocation()
	const { handleOpenCloseMenu } = useMenuContext()
	return (
		<ul
			className={styles.subMenu}
			onMouseEnter={e => handleMouseInDropdown?.(e)}
			onMouseLeave={e => handleMouseOutDropdown?.(e)}>
			{data.children?.map((item: { title: string; href: string }, index: number) => {
				const active = pathname === item.href
				return (
					<li onClick={()=>handleOpenCloseMenu()} className={`${styles.subMenuLi} ${active ? styles.activeSubMenuLi : ''}`} key={index}>
						{
							<AnchorLink className={styles.subLink} href={item.href || '#'} count={index}>
								{item.title}
							</AnchorLink>
						}
					</li>
				)
			})}
		</ul>
	)
}

export default DropdownMenu
