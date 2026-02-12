import { type MouseEvent } from 'react'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import type { MenuTypes } from '../../../containers/Navigation/dataNavigation/dataNavigation'

import DropdownMenu from '../../atoms/DropdownMenu/DropdownMenu'
import useMenuContext from '../../../hooks/useMenuContext'
import { ChevronDownSVG } from '../../../assets/icons/Icons'
interface MenuElementProps {
	data: MenuTypes
	index: number
	styles: { [key: string]: string }
	handleMouseIn?: (e: MouseEvent<HTMLElement>, index: number) => void
	handleMouseOut?: (e: MouseEvent<HTMLElement>, index: number) => void
	handleMouseInDropdown?: (e: MouseEvent<HTMLElement>) => void
	handleMouseOutDropdown?: (e: MouseEvent<HTMLElement>) => void
	handleCloseDropDown?: (e: MouseEvent<HTMLLIElement>) => void
	toggle?: () => void
}

const MenuElement = ({
	data,
	index,
	styles,
	handleMouseIn,
	handleMouseOut,
	handleMouseInDropdown,
	handleMouseOutDropdown,
	handleCloseDropDown,
	toggle,
}: MenuElementProps) => {
	const { handleOpenCloseDropdown, activeIndex } = useMenuContext()
	
	if (data.href === '') {
		return (
			<div
				key={index}
				data-element={index}
				className={`${styles.menuElementContainer} ${activeIndex === index ? styles.active : ''}`}
				onMouseEnter={e => handleMouseIn?.(e, index)}
				onMouseLeave={e => handleMouseOut?.(e, index)}
				onClick={e => handleOpenCloseDropdown(e)}>
				<div className={styles.menuElement}>
					<span className={styles.title}>{data.title}</span>

					<ChevronDownSVG className={`${styles.chevron} ${activeIndex === index ? styles.rotateArrow : ''}`} />
				</div>

				{data.children?.length ? (
					<DropdownMenu
						styles={styles}
						data={data}
						toggle={toggle}
						handleMouseInDropdown={handleMouseInDropdown}
						handleMouseOutDropdown={handleMouseOutDropdown}
						handleCloseDropDown={handleCloseDropDown}
					/>
				) : null}
			</div>
		)
	} else {
		return (
			<AnchorLink
				handleOpenCloseMenu={toggle}
				handleOpenCloseDropdown={handleOpenCloseDropdown}
				key={index}
				href={data.href}
				className={styles.link}>
				{data.title}
			</AnchorLink>
		)
	}
}

export default MenuElement
