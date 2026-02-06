import useSocialLinks from '../../../hooks/useSocialLinks'
interface SocialLinksProps {
	className?: string
}
import styles from './SocialLinks.module.scss'
const SocialLinks = ({ className }: SocialLinksProps) => {
	const { socialLinks } = useSocialLinks()

	return socialLinks.map(social => (
		<a
			key={social.name}
			href={social.url}
			className={`${styles.socialLink} ${className ? className : ''}`}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={social.ariaLabel}>
			{social.icon}
		</a>
	))
}

export default SocialLinks
