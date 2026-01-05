import type { MouseEvent } from 'react'
import type { MenuTypes } from '../../../containers/Navigation/dataNavigation/dataNavigation'
import useMenuContext from '../../../hooks/useMenuContext'
import AnchorLink from '../AnchorLink/AnchorLink'
import { useLocation } from 'react-router'



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

	const menuCategories = data.children

	const handleCloseDropDown = (e: MouseEvent<HTMLLIElement>) => {
		const target = e.currentTarget as HTMLLIElement
		const el = target.parentElement

		if (el && el.classList.contains(styles.active)) {
			el.classList.remove(styles.active)
		}
	}
	return (
		<ul
			className={styles.subMenu}
			onMouseEnter={e => handleMouseInDropdown?.(e)}
			onMouseLeave={e => handleMouseOutDropdown?.(e)}>
			{menuCategories?.map((item, index: number) => {
				const active = pathname === `/categories/${item.name?.split(' ').join('-').toLowerCase()}`
				
				const active2 = pathname === item.href
				
				const slug = item.name ? item.name.split(' ').join('-').toLowerCase() : item.slug
				const url = item ? (item.name ? `/categories/${slug}` : item.href) : '#'

				const menuName = item.name ? item.name : item.title

				return (
					<li
						onClick={e => {
							handleCloseDropDown(e)
							handleOpenCloseMenu()
						}}
						className={`${styles.subMenuLi} ${active2 ? styles.activeSubMenuLi : ''}`}
						key={index}>
						{
							<AnchorLink
								className={`${styles.subLink} ${active ? styles.activeSubMenuLi : ''}`}
								href={url!}
								count={index}>
								{menuName}
							</AnchorLink>
						}
					</li>
				)
			})}
		</ul>
	)
}

export default DropdownMenu
