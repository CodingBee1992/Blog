import { useRef } from 'react'
import { MenuArrowSVG } from '../../../assets/icons/nav/MenuArrowSVG'
import useWindowSize from '../../../hooks/useWindowSize'
import type { adminLinksProps } from '../../../types/types'
import AnchorLink from '../AnchorLink/AnchorLink'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import styles from './SideBarLink.module.scss'
import { useLocation } from 'react-router'

interface SideBarLinkProps {
	data: adminLinksProps
	index: number
}

const SideBarLink = ({ data, index }: SideBarLinkProps) => {
	const { width } = useWindowSize()
	const arrowRef = useRef<SVGSVGElement | null>(null)
	const sideBarLinkRef = useRef<HTMLDivElement | null>(null)
	const { pathname } = useLocation()
	const active = pathname === data.href
	
	const handleOpenCloseDropdown = () => {
		if (!sideBarLinkRef.current?.classList.contains(styles.activeSubLinks)) {
			const activeElements = document.querySelectorAll(`.${styles.activeSubLinks}`)
			const activeArrows = document.querySelectorAll(`.${styles.rotateArrow}`)

			if (activeElements) {
				activeElements.forEach(item => {
					item.classList.remove(styles.activeSubLinks)
				})
			}
			if (activeArrows) {
				activeArrows.forEach(item => {
					item.classList.remove(styles.rotateArrow)
				})
			}

			sideBarLinkRef.current?.classList.add(styles.activeSubLinks)
			arrowRef.current?.classList.add(styles.rotateArrow)
		} else {
			sideBarLinkRef.current?.classList.remove(styles.activeSubLinks)
			arrowRef.current?.classList.remove(styles.rotateArrow)
		}
	}

	

	if (data.href === '') {
		return (
			<div ref={sideBarLinkRef} key={index} data-element={index} className={`${styles.sideBarLink} `}>
				<div
					className={styles.sideBarLinkHelper}
					onClick={() => {
						handleOpenCloseDropdown()
						
					}}>
					<div className={styles.sideBarLinkName}>
						{data.icon} {width > 700 && <p>{data.title}</p>}
					</div>
					<MenuArrowSVG arrowRef={arrowRef} styles={styles} />
				</div>

				{data.children?.length ? (
					<DropdownMenu styles={styles} data={data}  />
				) : null}
			</div>
		)
	} else {
		return (
			<AnchorLink className={styles.sideBarLink} href={data.href}>
				<div className={`${styles.sideBarLinkHelper} ${active ? styles.activeSideBarLink : ''}`} onClick={()=>handleOpenCloseDropdown()}>
					<div className={styles.sideBarLinkName}>
						{data.icon} {width > 700 && <p>{data.title}</p>}
					</div>
				</div>
			</AnchorLink>
		)
	}
}

export default SideBarLink
