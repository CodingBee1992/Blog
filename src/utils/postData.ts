import bg1 from '../assets/img/sailboat.jpg'
import bg2 from '../assets/img/sunrise.jpg'
import bg3 from '../assets/img/boat.jpg'
import type { PostDataProps } from '../types/types'

const postData: PostDataProps[] = [
	{
		id: crypto.randomUUID(),
		image: bg1,
		href: '#',
		categories:[
			{ category: 'LifeStyle', href: '#' },
			
		],
		author: 'Rico & Jumbo',
		title: 'Tips and Ideas for better life from Rico & Jumbo',
	},
	{
		id: crypto.randomUUID(),
		image: bg2,
		href: '#',
		categories: [
			{ category: 'Food', href: '#' },
			{ category: 'Culture', href: '#' },
		],
		author: 'Rico & Jumbo',
		title: 'Tips and Ideas for better life from Rico & Jumbo',
	},
	{
		id: crypto.randomUUID(),
		image: bg3,
		href: '#',
		categories: [
			{ category: 'Work', href: '#' },
			{ category: 'Design', href: '#' },
		],
		author: 'Rico & Jumbo',
		title: 'Tips and Ideas for better life from Rico & Jumbo',
	},
]

export default postData
