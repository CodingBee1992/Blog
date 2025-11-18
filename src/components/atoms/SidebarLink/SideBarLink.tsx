import { useRef, type MouseEvent } from 'react'
import { MenuArrowSVG } from '../../../assets/icons/nav/MenuArrowSVG'
import useWindowSize from '../../../hooks/useWindowSize'
import type { adminLinksProps } from '../../../types/types'
import AnchorLink from '../AnchorLink/AnchorLink'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import styles from './SideBarLink.module.scss'

interface SideBarLinkProps {
	data: adminLinksProps
	index: number
}

const SideBarLink = ({ data, index }: SideBarLinkProps) => {
	const { width } = useWindowSize()
	const arrowRef = useRef<SVGSVGElement | null>(null)

	const handleOpenCloseDropdown = (e: MouseEvent<HTMLElement>, index: number) => {
		const target = e.currentTarget as HTMLElement
		let element
		arrowRef.current?.classList.toggle(styles.rotateArrow)
		if (Number(target.dataset.element) === index) {
			element = target

			if (!element.classList.contains(styles.active)) {
				const activeElements = document.querySelectorAll(`.${styles.active}`)

				if (activeElements) {
					activeElements.forEach(item => {
						item.classList.remove(styles.active)
					})
				}

				element.classList.add(styles.active)
				mobileRef.current?.classList.add(styles.overflowActive)
			} else {
				element.classList.remove(styles.active)
				mobileRef.current?.classList.remove(styles.overflowActive)
			}
		}
	}

	if (data.href === '') {
		return (
			<div
				key={index}
				data-element={index}
				className={`${styles.sideBarLink} ${styles.activeSubLinks}`}
				onClick={e => handleOpenCloseDropdown(e, index)}>
				<div className={styles.sideBarLinkHelper}>
					<div className={styles.sideBarLinkName}>
						{data.icon} {width > 700 && <p>{data.title}</p>}
					</div>
					<MenuArrowSVG arrowRef={arrowRef} styles={styles} />
				</div>
				{/* <div className={styles.menuElement}>
					<span className={styles.title}>{data.title}</span>

				</div> */}

				{data.children?.length ? <DropdownMenu styles={styles} data={data} /> : null}
			</div>
		)
	} else {
		return (
			<AnchorLink className={styles.sideBarLink} href={data.href}>
				<div className={styles.sideBarLinkHelper}>
					<div className={styles.sideBarLinkHelper}>
						<div className={styles.sideBarLinkName}>
							{data.icon} {width > 700 && <p>{data.title}</p>}
						</div>
					</div>
				</div>
			</AnchorLink>
		)
	}
}

export default SideBarLink
