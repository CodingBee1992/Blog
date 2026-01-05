

export interface MenuTypes {
	title: string
	href: string
    
	children?: { name?: string; slug?: string,title?:string,href?:string }[]  
}

const home: MenuTypes = {
	title: 'Home',
	href: '/',
}
export const defaultCategories: MenuTypes = {
	title: 'Categories',
	href: '',
	children: [
        { name: 'LifeStyle', slug: '/categories/lifestyle' },
        { name: 'Culture', slug: '/categories/culture' },
        { name: 'Travel', slug: '/categories/travel' },
        { name: 'Nature', slug: '/categories/nature' },
        { name: 'Photography', slug: '/categories/photography' },
        { name: 'Vacation', slug: '/categories/vacation' },
        { name: 'Work', slug: '/categories/work' },
        { name: 'Health', slug: '/categories/health' },
        { name: 'Family', slug: '/categories/family' },
        
    
    ],
}

const styles:MenuTypes ={
    title:'Styles',
    href:'/styles'
}
const about:MenuTypes ={
    title:'About',
    href:'/about'
}
const contact:MenuTypes ={
    title:'Contact',
    href:'/contact'
}

export const dataNavigation= [
    home,
    defaultCategories,
    
    styles,
    about,
    contact
]