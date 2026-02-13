import { useRef, type KeyboardEvent } from 'react'

import useWindowSize from '../../../hooks/useWindowSize'

import AnchorLink from '../AnchorLink/AnchorLink'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import styles from './SideBarLink.module.scss'
import { useLocation } from 'react-router'
import type { sideBarLinksProps } from '../../../types/types'
import useMenuContext from '../../../hooks/useMenuContext'
import { ChevronDownSVG } from '../../../assets/icons/Icons'

interface SideBarLinkProps {
	data: sideBarLinksProps
	index: number
}

const SideBarLink = ({ data, index }: SideBarLinkProps) => {
	const { sideBarMenu } = useMenuContext()
	const { close } = sideBarMenu
	const { width } = useWindowSize()
	const arrowRef = useRef<SVGSVGElement | null>(null)
	const sideBarLinkRef = useRef<HTMLDivElement | null>(null)
	const { pathname } = useLocation()
	const active = pathname === data.href

	const handleOpenCloseDropdown = () => {
		if (data.href !== 'admin') {
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
	}
	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleOpenCloseDropdown()
		}
	}

	if (data.href === '') {
		return (
			<div
				ref={sideBarLinkRef}
				key={index}
				data-element={index}
				tabIndex={0}
				className={`${styles.sideBarLink} ${index === 0 ? styles.activeSubLinks : ''} `}
				onKeyDown={e => onKeyDown(e)}>
				<div
					className={styles.sideBarLinkHelper}
					onClick={() => {
						handleOpenCloseDropdown()
					}}>
					<div className={styles.sideBarLinkName}>
						{data.icon} {width >= 700 && <p>{data.title}</p>}
					</div>
					<ChevronDownSVG arrowRef={arrowRef} className={`${styles.chevron}`}/>
				</div>

				{data.children?.length ? (
					<DropdownMenu
						styles={styles}
						data={data}
						toggle={() => {
							close()
						}}
					/>
				) : null}
			</div>
		)
	} else {
		return (
			<AnchorLink
				onKeyDown={onKeyDown}
				handleClose={() => {
					handleOpenCloseDropdown()
					close()
				}}
				className={styles.sideBarLink}
				href={data.href}>
				<div
					className={`${styles.sideBarLinkHelper} ${styles.sideBarPadding} ${active ? styles.activeSideBarLink : ''}`}>
					<div className={styles.sideBarLinkName}>
						{data.icon} {width >= 700 && <p>{data.title}</p>}
					</div>
				</div>
			</AnchorLink>
		)
	}
}

export default SideBarLink
