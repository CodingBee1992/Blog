import { NavLink } from 'react-router'
import styles from './Nav.module.scss'
import Logo from '../../components/atoms/logo/Logo'
import useWindowSize from '../../hooks/useWindowSize'
import DesktopNav from './desktopNav/DesktopNav'
import { dataNavigation, type MenuTypes } from './dataNavigation/dataNavigation'

import { ImgArrow } from '../../assets/icons/nav/IconSvg'
import AnchorLink from '../../components/atoms/AnchorLink/AnchorLink'
import { useRef, type RefObject } from 'react'

const Navigation = () => {
	const size = useWindowSize()

	const menuElementRef = useRef<RefObject<any>[]>([])
	// const [resetTimeOut,setResetTimeOut]= useState<NodeJS.Timeout[]>([])
	
	const mouseIn = (e: React.MouseEvent<HTMLElement>,id:number) => {
		const target = e.target as HTMLElement
		
		
		// resetTimeOut.forEach(item=> item.classList.remove(styles.active))
		
		if (target.dataset.element) {
			let element
			
			if (+target.dataset.element === id) {
				element = target.lastElementChild
			}
			if (element) {
				element.classList.add(styles.active)
			}
		}
	}

	const mouseOut = (e: React.MouseEvent<HTMLElement>,id:number) => {
		const target = e.target as HTMLElement
		if (target.dataset.element) {
			// const timeOutList = []
			
			
			
			let element: HTMLElement | undefined | null
			
			if (+target.dataset.element === id) {
				element = target.lastElementChild
				// timeOutList.push(element)
				// setResetTimeOut(timeOutList)
			}
			if (element) {
				setTimeout(() => {
					element.classList.remove(styles.active)
				}, 3000);
				

				
			}
		}
	}
	const menuElement = (data: MenuTypes, id: number, key: number) => {
		if (data.href === '') {
			return (
				<div
				ref={menuElementRef}
					key={key}
					data-element={id}
					className={styles.menuElement}
					onMouseEnter={e => mouseIn(e,id)}
					onMouseLeave={e => mouseOut(e,id)}>
					<span className={styles.title}>{data.title}</span>

					<ImgArrow styles={styles} />
					{data.children?.length > 0 ? (
						<ul className={styles.subMenu}>
							{data.children?.map((item: { title: string; href: string }, index: number) => {
								return (
									<li key={index}>
										{
											<AnchorLink className={styles.subLink} href={item.href} count={index}>
												{item.title}
											</AnchorLink>
										}
									</li>
								)
							})}
						</ul>
					) : null}
				</div>
			)
		} else {
			return (
				<AnchorLink key={id} href={data.href} className={styles.link}>
					{data.title}
				</AnchorLink>
			)
		}
	}

	return (
		<nav className={styles.container}>
			<NavLink to={'/'} aria-label="codingBee-logo">
				<Logo />
			</NavLink>
			<DesktopNav size={size} dataMenu={dataNavigation} menuElement={menuElement} />
		</nav>
	)
}

export default Navigation
