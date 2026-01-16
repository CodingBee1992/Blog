import { useSelector } from 'react-redux'
import AnchorLink from '../AnchorLink/AnchorLink'
import type { RootState } from '../../../store'

import SignOutBtn from '../SingOutBtn/SignOutBtn'
import useMenuContext from '../../../hooks/useMenuContext'
import { accountLinks, adminLinks } from '../../../utils/sideBarLinks'
import type { KeyboardEvent } from 'react'

interface ControlPanelUserProps {
	styles: Record<string, string>
}

const ControlPanelUser = ({ styles }: ControlPanelUserProps) => {
	const { role, name, avatar } = useSelector((state: RootState) => state.auth)
	const { userRef, openCloseUserMenu } = useMenuContext()

	const admin = adminLinks[0].href
	const account = accountLinks[0].children![0].href

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			openCloseUserMenu({ e, userRef })
		}
	}

	return (
		<div className={styles.controlPanelUser}>
			<div
				tabIndex={0}
				className={styles.authorInfo}
				onKeyDown={e => onKeyDown(e)}
				onClick={e => openCloseUserMenu({ e, userRef })}>
				<img src={`${avatar}`} alt="Avatar" className={styles.authorAvatar} />
				<span className={styles.author}>{name}</span>
			</div>
			<div ref={userRef} className={styles.controlSettings}>
				{(role === 'Admin' || role === 'Moderator') && (
					<AnchorLink className={styles.controlLinks} href={admin}>
						Admin Panel
					</AnchorLink>
				)}
				<AnchorLink className={styles.controlLinks} href={account}>
					Account
				</AnchorLink>

				<SignOutBtn className={styles.signOut}>Sign Out</SignOutBtn>
			</div>
		</div>
	)
}

export default ControlPanelUser
