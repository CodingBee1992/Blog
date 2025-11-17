
import AnchorLink from "../AnchorLink/AnchorLink"
import useMenuContext from "../../../hooks/useMenuContext"

interface ControlPanelSignInProps {
    styles:Record<string,string>
    
}

const ControlPanelSignIn = ({styles}:ControlPanelSignInProps) => {
	const {userRef,openCloseUserMenu} = useMenuContext()
	return (
		<>
			<button onClick={(e) => openCloseUserMenu({e,userRef})} className={styles.signInBtn}>
				Sign In
			</button>

			<div ref={userRef} className={styles.controlContainer}>
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
		</>
	)
}

export default ControlPanelSignIn
