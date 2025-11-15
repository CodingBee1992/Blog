import { useSelector } from 'react-redux'
import AnchorLink from '../AnchorLink/AnchorLink'
import type { RootState } from '../../../store'
import type { RefObject } from 'react'

interface ControlPanelUserProps<T extends HTMLElement> {
	styles: Record<string, string>
	userRef?: RefObject<T | null>
	openCloseUserMenu?: () => void
	signOut: () => void
}

const ControlPanelUser = <T extends HTMLDivElement>({
	styles,
	userRef,
	signOut,
	openCloseUserMenu,
}: ControlPanelUserProps<T>) => {
	const { isAdmin, name, avatar } = useSelector((state: RootState) => state.auth)
	return (
		<div className={styles.controlPanelUser}>
			<div className={styles.authorInfo} onClick={() => openCloseUserMenu?.()}>
				<img src={`${avatar}`} alt="Avatar" className={styles.authorAvatar} />
				<span className={styles.author}>{name}</span>
			</div>
			<div ref={userRef} className={styles.controlSettings}>
				{isAdmin && (
					<AnchorLink className={styles.controlLinks} href="/admin">
						Admin Panel
					</AnchorLink>
				)}
				<AnchorLink className={styles.controlLinks} href="/settings">
					Settings
				</AnchorLink>

				<button
					className={styles.signOut}
					onClick={() => {
						signOut()
					}}>
					Sign Out
				</button>
			</div>
		</div>
	)
}

export default ControlPanelUser
