import { useLocation } from 'react-router'
import type { ArticleContentProps } from '../types/types'

import postData from '../utils/postData'
import { createContext, type ReactNode } from 'react'

interface SinglePostProviderProps {
	children: ReactNode
}

const SinglePostContext = createContext<ArticleContentProps | null>(null)

const SinglePostProvider = ({ children }: SinglePostProviderProps) => {
	const { search } = useLocation()
	const query = new URLSearchParams(search)
	const id = Number(query.get('id'))
	const post = postData.find(item => item.id === id) || null
    

	return <SinglePostContext value={post}>{children}</SinglePostContext>
}

export { SinglePostContext, SinglePostProvider }
