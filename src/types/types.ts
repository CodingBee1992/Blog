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
	ariaLabel:string
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
	_id: string
	title: string
	introduction: string
	mainImage: { src: string; alt: string; caption: string,public_id?:string }
	author: { name: string; avatar: string }
	articleContent?: [
		{ type: 'title' | 'text' | 'completion' | 'callToAction' | 'add'; value: string },

		{ type: 'image'; value: { src: string; alt: string; caption: string } }
	]
	categories: string[]
	id?: string
	seo?: { slug: string; metaTitle: string; metaDescription: string }
	status?: string
	href?: string
	left?: string
	top?: string
	articleRef?: React.Ref<HTMLElement>
	styles?: { [key: string]: string }
	onImageLoad?:()=>void
	
}

export type ExtendedArticleContentProps = {
	createdAt: string
	publishedAt: string
	comments: CommentsDataProps[]
} & ArticleContentProps

export interface CommentsDataProps {
	_id: string
	postId: string | null
	parentId: string | null
	author: {
		_id: string
		name: string
		avatar: string
	}
	comment: string
	createdAt: string
	children?: CommentsDataProps[]
}

export interface adminLinksProps {
	title: string
	icon?: ReactNode
	href: string
	children?: adminLinksProps[]
}
