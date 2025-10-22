export interface MenuTypes {
	title: string
	href: string
	children?: { title: string; href: string }[] 
}

const dataMenu1: MenuTypes = {
	title: 'Home',
	href: '/',
}
const dataMemu2: MenuTypes = {
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
        { title: 'Relationship', href: '/categories/relationship' },
    
    ],
}

const dataMenu4:MenuTypes ={
    title:'Styles',
    href:'/styles'
}
const dataMenu5:MenuTypes ={
    title:'About',
    href:'/about'
}
const dataMenu6:MenuTypes ={
    title:'Contact',
    href:'/contact'
}

export const dataNavigation= [
    dataMenu1,
    dataMemu2,
    
    dataMenu4,
    dataMenu5,
    dataMenu6
]