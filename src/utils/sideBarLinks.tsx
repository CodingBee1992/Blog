import { AdminSVG, PostsSVG, UsersSVG } from '../assets/icons/adminPanelIcons/AdminPanelIcons'
import type { adminLinksProps } from '../types/types'

const adminLinks: adminLinksProps[] = [
	{
		title: 'Admin',
		href: '/admin',
		icon: <AdminSVG />,
		
	},
	{
		title: 'Posts',
		href: '',
		icon: <PostsSVG />,
		children: [
			{title:'List of Posts',href:'/posts/listsofposts'},
			{title:'Add Posts',href:'/posts/addpost'},
			{title:'Categories',href:'/posts/categories'},
			{title:'Tags',href:'/posts/tags'},
		],
	},
	{
		title: 'Users',
		href: '',
		icon: <UsersSVG />,
		children: [
			{title:'List',href:'/users/list'},
			{title:'Add User',href:'/users/adduser'},
			{title:'Roles & Permissions',href:'/users/roles&permissions'},
			
		],
	},
]

export { adminLinks }
