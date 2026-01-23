import AnchorLink from '../AnchorLink/AnchorLink'
import useMenuContext from '../../../hooks/useMenuContext'

interface ControlPanelSignInProps {
	styles: Record<string, string>
}

const ControlPanelSignIn = ({ styles }: ControlPanelSignInProps) => {
	const { userRef, openCloseUserMenu, toggleMenu } = useMenuContext()
	return (
		<div ref={userRef}>
			<button onClick={() => openCloseUserMenu()} className={styles.signInBtn}>
				Sign In
			</button>

			<div  className={`${styles.controlContainer} ${toggleMenu ? styles.displayVisibility : ''}`}>
				<AnchorLink className={styles.anchorLink} href="/login">
					Sign In
				</AnchorLink>
				<div className={styles.signUpContainer}>
					<span className={styles.signUpSpan}>Don't have an Account?</span>
					<AnchorLink className={styles.anchorLink} href="/registration">
						Sign Up
					</AnchorLink>
				</div>
			</div>
		</div>
	)
}

export default ControlPanelSignIn
