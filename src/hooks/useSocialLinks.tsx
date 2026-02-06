import { FacebookSVG, InstagramSVG, TwitterSVG, YouTubeSVG } from '../assets/icons/social/SocialIcons'
import type { SocialProps } from '../types/types'

const useSocialLinks = () => {


	const socialLinks:SocialProps[] = [
		{ name: 'Facebook', url: 'https://facebook.com', icon: <FacebookSVG />, ariaLabel: 'Facebook' },
		{ name: 'Twitter', url: 'https://twitter.com', icon: <TwitterSVG />, ariaLabel: 'X(Twitter)' },
		{ name: 'Instagram', url: 'https://instagram.com', icon: <InstagramSVG />, ariaLabel: 'Instagram' },
		{ name: 'YoutTube', url: 'https://youtube.com', icon: <YouTubeSVG />, ariaLabel: 'Youtube' },
	]

	return {socialLinks}
}

export default useSocialLinks
