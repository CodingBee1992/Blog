import type { ReactNode } from 'react'
import type { SocialProps } from '../../../types/types'

interface SocialIconProps {
	children: ReactNode
	styles: { [key: string]: string }
	social:SocialProps
 
}

const SocialIcon = ({ styles,social, children }: SocialIconProps) => {
	return (
		<li className={styles.socialLi}>
			<a
				key={social.name}
				href={social.url}
				className={styles.socialLink}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={social.ariaLabel}>
				{children}
			</a>
		</li>
	)
}

export default SocialIcon
