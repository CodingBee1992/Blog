import Logo from "../../atoms/logo/Logo"
import SocialLinks from "../SocialLinks/SocialLinks"
import styles from './GreetingWrapper.module.scss'

const GreetingWrapper = () => {
	return (
		<div className={styles.greetingWrapper}>
			<Logo styles={styles} />
			<div className={styles.socialWrapper}>
				<SocialLinks />
			</div>
		</div>
	)
}

export default GreetingWrapper
