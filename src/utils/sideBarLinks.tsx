

import { PostsSVG, UsersSVG } from '../assets/icons/adminPanelIcons/AdminPanelIcons'
import type { adminLinksProps } from '../types/types'



const adminLinks: adminLinksProps[] = [
	{
		linkName: 'Posts',
		href:'/createpost',
		icon: <PostsSVG/>,
	},
	{
		linkName: 'Users',
		href:'/users',
		icon: <UsersSVG />,
	},
]

export { adminLinks }
