import type { RefObject } from "react"
import AnchorLink from "../AnchorLink/AnchorLink"

interface ControlPanelSignInProps <T extends HTMLElement> {
    styles:Record<string,string>
    userRef?: RefObject<T | null>
    openCloseUserMenu?:()=> void
}

const ControlPanelSignIn = <T extends HTMLDivElement> ({styles,openCloseUserMenu,userRef}:ControlPanelSignInProps<T>) => {
	return (
		<>
			<button onClick={() => openCloseUserMenu?.()} className={styles.signInBtn}>
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
