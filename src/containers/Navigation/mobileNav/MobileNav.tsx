import CloseButton from '../../../components/atoms/CloseButton/CloseButton'
import MenuElement from '../../../components/organism/menuElement/MenuElement'
import type { MenuTypes } from '../dataNavigation/dataNavigation'
import styles from './MobileNav.module.scss'
import type { MouseEvent, RefObject } from 'react'

interface MobileRefProps {
	mobileRef: RefObject<HTMLDivElement | null>
	handleCloseMenu: () => void
	dataMenu: MenuTypes[]
}

const MobileNav = ({ dataMenu, mobileRef, handleCloseMenu }: MobileRefProps) => {


	const handleOpenCloseDropdown = (e:MouseEvent<HTMLElement>,index:number)=>{
		const target = e.target as HTMLElement
		
		if(+target.dataset.element === index){
			
			const element = target.lastElementChild
			const subMenu = document.querySelectorAll(`.${styles.active}`)
			if(subMenu){
				subMenu.forEach(item=> item.classList.remove(styles.active))
			}

			if(element){
				element?.classList.add(styles.active)
				
				setTimeout(() => {
					element?.classList.add(styles.height)
					
				}, 300);
			}

		}
	}

	return (
		<div ref={mobileRef} className={styles.mobileContainer}>
			<div className={styles.mobileElement}>
				<CloseButton styles={styles} handleClose={() => handleCloseMenu()} />
				<h2 className={styles.title}>Navigate to</h2>
			</div>
			<div className={styles.mobileLink}>
				{dataMenu.map((item: MenuTypes, index: number) => {
					return <MenuElement styles={styles} data={item} index={index} handleOpenCloseDropdown={handleOpenCloseDropdown}/>
				})}
			</div>
		</div>
	)
}

export default MobileNav
