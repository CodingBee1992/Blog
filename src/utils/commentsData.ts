import authorImg from '../assets/avatar/user.jpg'
import type { CommentsDataProps } from '../types/types'

const commentsData: CommentsDataProps[] = [
	{
		id: 2001,
		postId: 1001,
		parentId: null,
		author: { name: 'Jimba', avatar: authorImg },
		comment:
			'Absolutely stunning article! I visited Namibia last year and your description brought all the memories back. The silence of the desert is truly something you have to feel to understand.',
		createdAt: 'October 27, 2025',
	},
	{
		id: 2002,
		postId: 1001,
		parentId: 2001,
		author: { name: 'Rico & Jumbo', avatar: authorImg },
		comment:
			"Thank you, Jimba! You're right — the Namib has a kind of magic that words can barely capture. That morning light over the dunes stays with you forever. 🌅",
		createdAt: 'October 27, 2025',
	},
	{
		id: 2003,
		postId: 1001,
		parentId: null,
		author: { name: 'Jumbo', avatar: authorImg },
		comment:
			"I've always dreamed of seeing the Namib Desert. Your post just convinced me to finally plan the trip! The way you describe the fog and the dunes is so vivid.",
		createdAt: 'October 28, 2025',
	},
	{
		id: 2004,
		postId: 1001,
		parentId: null,
		author: { name: 'Majkel', avatar: authorImg },
		comment:
			'The way you write makes me feel like I was walking across those dunes myself. Namibia has been on my bucket list for years — now I know why!',
		createdAt: 'October 29, 2025',
	},
	{
		id: 2005,
		postId: 1001,
		parentId: null,
		author: { name: 'Rico', avatar: authorImg },
		comment: 'Beautiful photos and such a peaceful story. Nature really is the best teacher.',
		createdAt: 'October 29, 2025',
	},
	{
		id: 2006,
		postId: 1001,
		parentId: 2004,
		author: { name: 'Anna', avatar: authorImg },
		comment:
			'Absolutely stunning article! I visited Namibia last year and your description brought all the memories back. The silence of the desert is truly something you have to feel to understand.',
		createdAt: 'October 27, 2025',
	},
	{
		id: 2007,
		postId: 1001,
		parentId: 2006,
		author: { name: 'Kruszynka', avatar: authorImg },
		comment:
			'Absolutely stunning article! I visited Namibia last year and your description brought all the memories back. The silence of the desert is truly something you have to feel to understand.',
		createdAt: 'October 27, 2025',
	},
	{
		id: 2001,
		postId: 1002,
		parentId: null,
		author: { name: 'Jimba', avatar: authorImg },
		comment:
			'Absolutely stunning article! I visited Namibia last year and your description brought all the memories back. The silence of the desert is truly something you have to feel to understand.',
		createdAt: 'October 27, 2025',
	},
	{
		id: 2002,
		postId: 1002,
		parentId: 2001,
		author: { name: 'Rico & Jumbo', avatar: authorImg },
		comment:
			"Thank you, Jimba! You're right — the Namib has a kind of magic that words can barely capture. That morning light over the dunes stays with you forever. 🌅",
		createdAt: 'October 27, 2025',
	},
	{
		id: 2003,
		postId: 1002,
		parentId: null,
		author: { name: 'Jumbo', avatar: authorImg },
		comment:
			"I've always dreamed of seeing the Namib Desert. Your post just convinced me to finally plan the trip! The way you describe the fog and the dunes is so vivid.",
		createdAt: 'October 28, 2025',
	},
	{
		id: 2004,
		postId: 1002,
		parentId: null,
		author: { name: 'Majkel', avatar: authorImg },
		comment:
			'The way you write makes me feel like I was walking across those dunes myself. Namibia has been on my bucket list for years — now I know why!',
		createdAt: 'October 29, 2025',
	},
	{
		id: 2005,
		postId: 1002,
		parentId: null,
		author: { name: 'Rico', avatar: authorImg },
		comment: 'Beautiful photos and such a peaceful story. Nature really is the best teacher.',
		createdAt: 'October 29, 2025',
	},
	{
		id: 2006,
		postId: 1002,
		parentId: 2004,
		author: { name: 'Anna', avatar: authorImg },
		comment:
			'Absolutely stunning article! I visited Namibia last year and your description brought all the memories back. The silence of the desert is truly something you have to feel to understand.',
		createdAt: 'October 27, 2025',
	},
	{
		id: 2007,
		postId: 1002,
		parentId: 2006,
		author: { name: 'Kruszynka', avatar: authorImg },
		comment:
			'Absolutely stunning article! I visited Namibia last year and your description brought all the memories back. The silence of the desert is truly something you have to feel to understand.',
		createdAt: 'October 27, 2025',
	},
]

export default commentsData


