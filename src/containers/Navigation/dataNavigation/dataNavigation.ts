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
        { title: 'Design', href: '/categories/design' },
        { title: 'LifeStyle', href: '/categories/lifestyle' },
        { title: 'Photography', href: '/categories/photography' },
        { title: 'Vacation', href: '/categories/vacation' },
        { title: 'Work', href: '/categories/work' },
        { title: 'Health', href: '/categories/health' },
        { title: 'Family', href: '/categories/family' },
        { title: 'Relationship', href: '/categories/relationship' },
    
    ],
}
const dataMenu3: MenuTypes ={
    title:'Blog',
    href:'',
    children:[
        {title:'Video Post',href:'/blog/video-post'},
        {title:'Audio Post',href:'/blog/audio-post'},
        {title:'Standard Post',href:'/blog/standard-post'}
    ]
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
    dataMenu3,
    dataMenu4,
    dataMenu5,
    dataMenu6
]