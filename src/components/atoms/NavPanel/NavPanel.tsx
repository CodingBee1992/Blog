import useMenuContext from '../../../hooks/useMenuContext'

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
		</div>
	)
}

export default NavPanel
