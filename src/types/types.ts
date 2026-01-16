import type { ReactNode } from 'react'


export interface Size {
	width: number
	height: number
}

// export type MenuElement = (data: MenuTypes, id: number, key: number) => JSX.Element

export interface SearchProps {
	isOpen?: boolean
	handleIsOpen?: () => void
}

export type SocialProps = {
	path: string
	icon: ReactNode
	ariaLabel: string
}

export interface ArticleContentProps {
	_id: string
	title: string
	introduction: string
	mainImage: { src: string; alt: string; caption: string; public_id?: string }
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
	onImageLoad?: () => void
}

export type ExtendedArticleContentProps = {
	createdAt: string
	publishedAt: string
	
	commentsCount:string
} & ArticleContentProps

export interface CommentsDataProps {
	_id: string
	postId: string | null
	parentId: string | null
	author: {
		_id: string
		name: string
		avatar: {
			src:string,
			public_id:string
		}
	}
	comment: string
	createdAt: string
	children?: CommentsDataProps[]
}

export interface sideBarLinksProps {
	title: string
	icon?: ReactNode
	href: string
	children?: sideBarLinksProps[]
}

export interface UsersProps {
	_id: string
	name: string
	email: string
	avatar: {
		src:string,
		public_id:string
	}
	role: string
	isVerified: boolean
	createdAt: string
	updatedAt: string
	commentsCount: number
	postCount?: number
	lastLogin:string
}

export interface CommentsProps {
	_id: string
	comment: string
	createdAt: string
	title: string
	postId: string
	categories: string[]
	author: {
		_id: string
		name: string
	}
	seo?: { slug: string; metaTitle: string; metaDescription: string }
}

export interface CategoryProps {
	name: string
	slug: string
	_id: string
	id: string
}
