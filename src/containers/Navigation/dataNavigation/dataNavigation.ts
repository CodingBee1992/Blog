export interface MenuTypes {
	title: string
	href: string
	children?: { title: string; href: string }[] 
}

const home: MenuTypes = {
	title: 'Home',
	href: '/',
}
export const categories: MenuTypes = {
	title: 'Categories',
	href: '',
	children: [
        { title: 'LifeStyle', href: '/categories/lifestyle' },
        { title: 'Culture', href: '/categories/culture' },
        { title: 'Travel', href: '/categories/travel' },
        { title: 'Nature', href: '/categories/nature' },
        { title: 'Photography', href: '/categories/photography' },
        { title: 'Vacation', href: '/categories/vacation' },
        { title: 'Work', href: '/categories/work' },
        { title: 'Health', href: '/categories/health' },
        { title: 'Family', href: '/categories/family' },
        
    
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
    categories,
    
    styles,
    about,
    contact
]