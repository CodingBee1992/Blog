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

export interface PostDataProps {
	id: number
	image: string
	href: string
	categories: { category: string; href: string }[]
	author: { name: string; avatar: string; href: string }
	title: string
	mainText: string
	articleContent: {
		title?: string
		text?: string
		imgContent?: { img: string; alt: string; imgtext: string }[]
		completion?: string
		callToAction?: string
	}[]
	left?: string
	top?: string
	articleRef?: React.Ref<HTMLDivElement>
	styles?: { [key: string]: string }
}
export interface ArticleContentProps {
	id: number
	image: string
	href: string
	categories: { category: string; href: string }[]
	author: { name: string; avatar: string; href: string }
	title: string
	mainText: string
	articleContent: {
		title?: string
		text?: string
		imgContent?: { img: string; alt: string; imgtext: string }[]
		completion?: string
		callToAction?: string
	}[]
}

export interface CommentsDataProps {
	_id: string
	postId: string | null
	parentId: string | null
	author:{name:string,avatar:string}
	comment:string
	createdAt:string
	children?:CommentsDataProps[]
}
