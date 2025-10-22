import bg1 from '../assets/img/sailboat.jpg'
import bg2 from '../assets/img/sunrise.jpg'
import bg3 from '../assets/img/boat.jpg'
import bg4 from '../assets/img/desert1.jpg'
import type { PostDataProps } from '../types/types'



const postData: PostDataProps[] = [
	{
		id: 1001,
		image: bg1,
		href: '/blog',
		categories: [{ category: 'LifeStyle', href: '/categories/lifestyle' }],
		author: { name: 'Rico & Jumbo', href: '/about/author' },
		title: 'Tips and Ideas for better life from Rico & Jumbo',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi velit quia porro, vero reprehenderit, quasi fugiat, atque rerum incidunt error corrupti culpa cupiditate unde eos tenetur. Quisquam quasi commodi rerum.',
	},
	{
		id: 1002,
		image: bg2,
		href: '/blog',
		categories: [
			{ category: 'Travel,', href: '/categories/travel' },
			{ category: 'Nature', href: '/categories/nature' },
		],
		author: { name: 'Rico & Jumbo', href: '/about/author' },
		title: 'Lakes in Africa',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi velit quia porro, vero reprehenderit, quasi fugiat, atque rerum incidunt error corrupti culpa cupiditate unde eos tenetur. Quisquam quasi commodi rerum.',
	},

	{
		id: 1003,
		image: bg4,
		href: '/blog',
		categories: [
			{ category: 'Nature', href: '/categories/nature' },
			{ category: 'Culture', href: '/categories/culture' },
		],
		author: { name: 'Rico & Jumbo', href: '/about/author' },
		title: 'Namibia Deserts ',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi velit quia porro, vero reprehenderit, quasi fugiat, atque rerum incidunt error corrupti culpa cupiditate unde eos tenetur. Quisquam quasi commodi rerum.',
	},
	{
		id: 1004,
		image: bg3,
		href: '/blog',
		categories: [
			{ category: 'Travel', href: '/categories/travel' },
			{ category: 'Design', href: '/categories/design' },
		],
		author: { name: 'Rico & Jumbo', href: '/about/author' },
		title: 'Peru - The Sun of the South America',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi velit quia porro, vero reprehenderit, quasi fugiat, atque rerum incidunt error corrupti culpa cupiditate unde eos tenetur. Quisquam quasi commodi rerum.',
	},
	{
		id: 1005,
		image: bg3,
		href: '/blog',
		categories: [
			{ category: 'Travel', href: '/categories/travel' },
			{ category: 'Design', href: '/categories/design' },
		],
		author: { name: 'Rico & Jumbo', href: '/about/author' },
		title: 'Peru - The Sun of the South America',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi velit quia porro, vero reprehenderit, quasi fugiat, atque rerum incidunt error corrupti culpa cupiditate unde eos tenetur. Quisquam quasi commodi rerum.',
	},
	{
		id: 1006,
		image: bg3,
		href: '/blog',
		categories: [
			{ category: 'Travel', href: '/categories/travel' },
			{ category: 'Design', href: '/categories/design' },
		],
		author: { name: 'Rico & Jumbo', href: '/about/author' },
		title: 'Peru - The Sun of the South America',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi velit quia porro, vero reprehenderit, quasi fugiat, atque rerum incidunt error corrupti culpa cupiditate unde eos tenetur. Quisquam quasi commodi rerum.',
	},
	{
		id: 1007,
		image: bg3,
		href: '/blog',
		categories: [
			{ category: 'Travel', href: '/categories/travel' },
			{ category: 'Design', href: '/categories/design' },
		],
		author: { name: 'Rico & Jumbo', href: '/about/author' },
		title: 'Peru - The Sun of the South America',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi velit quia porro, vero reprehenderit, quasi fugiat, atque rerum incidunt error corrupti culpa cupiditate unde eos tenetur. Quisquam quasi commodi rerum.',
	},
	{
		id: 1008,
		image: bg3,
		href: '/blog',
		categories: [
			{ category: 'Travel', href: '/categories/travel' },
			{ category: 'Design', href: '/categories/design' },
		],
		author: { name: 'Rico & Jumbo', href: '/about/author' },
		title: 'Peru - The Sun of the South America',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi velit quia porro, vero reprehenderit, quasi fugiat, atque rerum incidunt error corrupti culpa cupiditate unde eos tenetur. Quisquam quasi commodi rerum.',
	},
]

export default postData
