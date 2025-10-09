import React, { useRef, useState } from 'react'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { ImgArrow } from '../../../assets/icons/nav/IconSvg'
import type { MenuTypes } from '../../../containers/Navigation/dataNavigation/dataNavigation'
import styles from './MenuElement.module.scss'
import DropdownMenu from '../../atoms/DropdownMenu/DropdownMenu'
interface MenuElementProps {
	data: MenuTypes
	index: number
}

const MenuElement = ({ data, index }: MenuElementProps) => {
	const menuElementRef = useRef<HTMLDivElement>(null)
	const [timeOutListIn, setTimeOutListIn] = useState<NodeJS.Timeout[]>([])
	const [timeOutListOut, setTimeOutListOut] = useState<NodeJS.Timeout[]>([])
	const handleMouseIn = (e: React.MouseEvent<HTMLElement>, index: number) => {
		const target = e.target as HTMLElement

		if (target.dataset.element) {
			timeOutListIn.forEach(item => {
				clearInterval(item)
			})
			timeOutListOut.forEach(item => clearInterval(item))

			let element

			if (+target.dataset.element === index) {
				element = target.lastElementChild

				const subMenu = document.querySelectorAll(`.${styles.active}`)

				if (subMenu)
					subMenu.forEach(item => {
						item.classList.remove(styles.active)
					})
			}
			if (element) {
				element.classList.add(styles.active)
			}
		}
	}

	const handleMouseOut = (e: React.MouseEvent<HTMLElement>, index: number) => {
		const target = e.target as HTMLElement

		if (target.dataset.element) {
			let element

			if (+target.dataset.element === index) {
				element = target.lastElementChild
			}
			if (element) {
				const resetList = []
				const resetTime = setTimeout(() => {
					element.classList.remove(styles.active)
				}, 500)
				resetList.push(resetTime)
				setTimeOutListIn(resetList)
			}
		}
	}

	const handleMouseInDropdown = (e: React.MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLElement
		if (target.matches(`.${styles.active}`)) {
			timeOutListIn.forEach(item => clearInterval(item))
		}
		
		if (target.dataset.main) {
			timeOutListOut.forEach(item => clearInterval(item))
		}
	}
	const handleMouseOutDropdown = (e: React.MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLElement

		const subElement = target.closest('ul')
		
		if (subElement?.matches(`.${styles.active}`)) {
			const resetList = []
			const resetTime = setTimeout(() => {
				subElement.classList.remove(styles.active)
			}, 1000)
			resetList.push(resetTime)
			setTimeOutListOut(resetList)
		}
	}

	if (data.href === '') {
		return (
			<div
				ref={menuElementRef}
				key={crypto.randomUUID()}
				data-element={index}
				className={styles.menuElement}
				onMouseEnter={e => handleMouseIn(e, index)}
				onMouseLeave={e => handleMouseOut(e, index)}>
				<span className={styles.title}>{data.title}</span>

				<ImgArrow styles={styles} />
				{data.children?.length ? (
					<DropdownMenu
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
