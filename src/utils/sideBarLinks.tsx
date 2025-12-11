import { AdminSVG, PostsSVG, UsersSVG } from '../assets/icons/adminPanelIcons/AdminPanelIcons'
import type { adminLinksProps } from '../types/types'

const adminLinks: adminLinksProps[] = [
	{
		title: 'Admin',
		href: '/admin',
		icon: <AdminSVG />,
		children:[
			{title:'Admin Room',href:'/admin/room'}
		]
		
	},
	{
		title: 'Posts',
		href: '',
		icon: <PostsSVG />,
		children: [
			{title:'List of Posts',href:'/admin/posts/listofposts'},
			{title:'Add Posts',href:'/admin/posts/addpost'},
			{title:'Categories',href:'/admin/posts/categories'},
			{title:'Tags',href:'/admin/posts/tags'},
		],
	},
	{
		title: 'Users',
		href: '',
		icon: <UsersSVG />,
		children: [
			{title:'List',href:'/admin/users/list'},
			{title:'Add User',href:'/admin/users/adduser'},
			{title:'Roles & Permissions',href:'/admin/users/permissions'},
			
		],
	},
]

export { adminLinks }
