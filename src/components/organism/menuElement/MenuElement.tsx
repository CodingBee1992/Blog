import { useRef, type MouseEvent } from 'react'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { ImgArrow } from '../../../assets/icons/nav/IconSvg'
import type { MenuTypes } from '../../../containers/Navigation/dataNavigation/dataNavigation'
// import styles from './MenuElement.module.scss'
import DropdownMenu from '../../atoms/DropdownMenu/DropdownMenu'
interface MenuElementProps {
	data: MenuTypes
	index: number
	styles: { [key: string]: string }
	handleMouseIn?: (e: MouseEvent<HTMLElement>, index: number) => void
	handleMouseOut?: (e: MouseEvent<HTMLElement>, index: number) => void
	handleMouseInDropdown?: (e: MouseEvent<HTMLElement>) => void
	handleMouseOutDropdown?: (e: MouseEvent<HTMLElement>) => void
	handleOpenCloseDropdown?: (e: MouseEvent<HTMLElement>, index: number) => void
}

const MenuElement = ({
	data,
	index,
	styles,
	handleMouseIn,
	handleMouseOut,
	handleMouseInDropdown,
	handleMouseOutDropdown,
	handleOpenCloseDropdown,
}: MenuElementProps) => {
	const menuElementRef = useRef<HTMLDivElement>(null)

	if (data.href === '') {
		return (
			<div
				ref={menuElementRef}
				key={crypto.randomUUID()}
				data-element={index}
				className={styles.menuElementContainer}
				onMouseEnter={e => handleMouseIn?.(e, index)}
				onMouseLeave={e => handleMouseOut?.(e, index)}
				onClick={e => handleOpenCloseDropdown?.(e, index)}>
				<div className={styles.menuElement}>
					<span className={styles.title}>{data.title}</span>

					<ImgArrow styles={styles} />
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
