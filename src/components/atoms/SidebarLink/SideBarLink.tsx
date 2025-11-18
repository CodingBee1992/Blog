import useWindowSize from '../../../hooks/useWindowSize'
import type { adminLinksProps } from '../../../types/types'
import AnchorLink from '../AnchorLink/AnchorLink'
import styles from './SideBarLink.module.scss'
const SideBarLink = ({ icon, linkName, href }: adminLinksProps) => {
	const { width } = useWindowSize()
	return (
		<AnchorLink className={styles.sideBarLink} href={href}>
			<div className={styles.sideBarLinkHelper}>
				{icon} {width > 700 && linkName}
			</div>
		</AnchorLink>
	)
}

export default SideBarLink
