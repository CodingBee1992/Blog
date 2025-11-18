import { type MouseEvent } from 'react'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { MenuArrowSVG } from '../../../assets/icons/nav/MenuArrowSVG'
import type { MenuTypes } from '../../../containers/Navigation/dataNavigation/dataNavigation'
// import styles from './MenuElement.module.scss'
import DropdownMenu from '../../atoms/DropdownMenu/DropdownMenu'
import useMenuContext from '../../../hooks/useMenuContext'
interface MenuElementProps {
	data: MenuTypes
	index: number
	styles: { [key: string]: string }
	handleMouseIn?: (e: MouseEvent<HTMLElement>, index: number) => void
	handleMouseOut?: (e: MouseEvent<HTMLElement>, index: number) => void
	handleMouseInDropdown?: (e: MouseEvent<HTMLElement>) => void
	handleMouseOutDropdown?: (e: MouseEvent<HTMLElement>) => void
	
	
}

const MenuElement = ({
	data,
	index,
	styles,
	handleMouseIn,
	handleMouseOut,
	handleMouseInDropdown,
	handleMouseOutDropdown,
	
	
}: MenuElementProps) => {
	const {handleOpenCloseDropdown} = useMenuContext()

	if (data.href === '') {
		return (
			<div
				
				key={index}
				data-element={index}
				className={styles.menuElementContainer}
				onMouseEnter={e => handleMouseIn?.(e, index)}
				onMouseLeave={e => handleMouseOut?.(e, index)}
				onClick={e => handleOpenCloseDropdown(e, index)}>
				<div className={styles.menuElement}>
					<span className={styles.title}>{data.title}</span>

					<MenuArrowSVG styles={styles} />
				</div>

				{data.children?.length ? (
					<DropdownMenu
						styles={styles}
						data={data}
						handleMouseInDropdown={handleMouseInDropdown}
						handleMouseOutDropdown={handleMouseOutDropdown}
					/>
				) : null}
			</div>
		)
	} else {
		return (
			<AnchorLink key={index} href={data.href} className={styles.link}>
				{data.title}
			</AnchorLink>
		)
	}
}

export default MenuElement
