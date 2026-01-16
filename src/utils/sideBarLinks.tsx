import {
	AdminSVG,
	CommentsSVG,
	DashboardSVG,
	PostsSVG,
	ProfileSVG,
	SecuritySVG,
	UsersSVG,
} from '../assets/icons/adminPanelIcons/AdminPanelIcons'
import type { sideBarLinksProps } from '../types/types'

const adminLinks: sideBarLinksProps[] = [
	{
		title: 'Dashboard',
		href: '/admin',
		icon: <DashboardSVG />,
	},
	{
		title: 'Admin',
		href: '',
		icon: <AdminSVG />,
		children: [{ title: 'Admins&Moderators', href: '/admin/room' }],
	},
	{
		title: 'Posts',
		href: '',
		icon: <PostsSVG />,
		children: [
			{ title: 'List of Posts', href: '/admin/posts/listofposts' },
			{ title: 'Add Posts', href: '/admin/posts/addpost' },
			{ title: 'Categories', href: '/admin/posts/categories' },
			{ title: 'Change History', href: '/admin/posts/change/history' },
		],
	},
	{
		title: 'Users',
		href: '',
		icon: <UsersSVG />,
		children: [
			{ title: 'List', href: '/admin/users/list' },
			{ title: 'Add User', href: '/admin/users/adduser' },
			{ title: 'Roles & Permissions', href: '/admin/users/permissions' },
			{ title: 'Change History', href: '/admin/users/change/history' },
		],
	},
	{
		title: 'Comments',
		href: '',
		icon: <CommentsSVG />,
		children: [
			{ title: 'List', href: '/admin/comments/list' },
			{ title: 'Settigns', href: '/admin/comments/settings' },
			{ title: 'Change History', href: '/admin/comments/change/history' },
		],
	},
	{
	title: 'Security',
	href: '',
	icon: <SecuritySVG />,
	children: [
		{ title: 'Login Attempts', href: '/admin/security/logins' },
		{ title: 'Unauthorized Access', href: '/admin/security/access' },
		{ title: 'Password Events', href: '/admin/security/passwords' },
	],
},
]
const accountLinks: sideBarLinksProps[] = [
	
	{
		title: 'Account',
		href: '',
		icon: <ProfileSVG />,
		children: [
			{ title: 'Profile Info', href: '/account' },
			{ title: 'Security', href: '/account/profile/security' },
			
			
		],
	},
	{
		title: 'Activity',
		href: '',
		icon: <ProfileSVG />,
		children: [
			{ title: 'Profile Info', href: '/account/profile' },
			{ title: 'Security', href: '/account/profile/security' },
			
			
		],
	},
	
	
]

export { adminLinks, accountLinks }
