import CloseButton from '../../../components/atoms/CloseButton/CloseButton'
import MenuElement from '../../../components/organism/menuElement/MenuElement'
import type { MenuTypes } from '../dataNavigation/dataNavigation'
import styles from './MobileNav.module.scss'
import type { RefObject } from 'react'

interface MobileRefProps {
	mobileRef: RefObject<HTMLDivElement | null>
	handleCloseMenu: () => void
  dataMenu:MenuTypes[]
}

const MobileNav = ({dataMenu, mobileRef, handleCloseMenu }: MobileRefProps) => {
	return (
		<div ref={mobileRef} className={styles.mobileContainer}>
			<div>
				<CloseButton styles={styles} handleClose={() => handleCloseMenu()} />
          <h2 className={styles.title}>Navigate to</h2>
			</div>
      {dataMenu.map((item:MenuTypes,index:number)=>{

        return <MenuElement styles={styles} data={item} index={index}/>
      }
      )}
		</div>
	)
}

export default MobileNav
