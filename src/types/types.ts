import type { JSX, ReactNode } from 'react'
import type { MenuTypes } from '../containers/Navigation/dataNavigation/dataNavigation'

export interface Size {
	width: number
	height: number
}

export type MenuElement = (data: MenuTypes, id: number, key: number) => JSX.Element

export interface SearchProps {
	isOpen?: boolean
	handleIsOpen?: () => void
}

export type SocialProps = {
	path: string
	icon: ReactNode
}

export interface ArticleContentProps {
	id?: string
	image?: string
	href?: string
	categories?: { category: string; href: string }[]
	author?: { name: string; href: string }
	title?: string
	text?: string
	// position?: 'position'
	left?: string
	top?: string
	articleRef?: React.Ref<HTMLDivElement>
}

export interface ArticleTextProps {
	styles: { [key: string]: string }
}

// export interface ArticleContentProps {
//   id:string
// }