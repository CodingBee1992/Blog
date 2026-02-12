import useMenuContext from '../../../hooks/useMenuContext'
import Logo from '../logo/Logo'

import styles from './NavPanel.module.scss'

const NavPanel = () => {
	const { sideBarMenu } = useMenuContext()
	const { open } = sideBarMenu
	return (
		<div className={styles.panelNav}>
			<button
				className={`${styles.btn} ${styles.menu} `}
				title="Menu"
				onClick={() => {
					
					open()
				}}>
				<span className={styles.span}></span>
			</button>
			<Logo styles={styles} />
		</div>
	)
}

export default NavPanel
