import { useEffect, useRef } from 'react'
import styles from './MenuIcon.module.scss'
import useWindowSize from '../../../hooks/useWindowSize'
import useMenuContext from '../../../hooks/useMenuContext'

// interface MenuIconProps {
// 	handleOpenMenu: () => void
// }

const MenuIcon = () => {
	const size = useWindowSize()
	const refBtn = useRef<HTMLButtonElement>(null)
	const { mobileRef, handleOpenCloseMenu } = useMenuContext()
	useEffect(() => {
		if (size.width <= 900) {
			refBtn.current?.classList.add(styles.toggle)
		} else {
			refBtn.current?.classList.remove(styles.toggle)
		}
	}, [size])

	return (
		<button ref={refBtn} className={styles.btn} title="Menu" onClick={() => handleOpenCloseMenu({ mobileRef })}>
			<span className={styles.span}></span>
		</button>
	)
}

export default MenuIcon
