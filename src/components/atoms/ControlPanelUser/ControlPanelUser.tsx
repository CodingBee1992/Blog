import { useSelector } from 'react-redux'
import AnchorLink from '../AnchorLink/AnchorLink'
import type { RootState } from '../../../store'

import SignOutBtn from '../SingOutBtn/SignOutBtn'
import useMenuContext from '../../../hooks/useMenuContext'

interface ControlPanelUserProps {
	styles: Record<string, string>
	
}

const ControlPanelUser = ({ styles }: ControlPanelUserProps) => {
	const { isAdmin, name, avatar } = useSelector((state: RootState) => state.auth)
	const { userRef, openCloseUserMenu } = useMenuContext()
	return (
		<div className={styles.controlPanelUser}>
			<div className={styles.authorInfo} onClick={() => openCloseUserMenu({ userRef })}>
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

				<SignOutBtn styles={styles} />
			</div>
		</div>
	)
}

export default ControlPanelUser
