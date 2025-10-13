import type { JSX, ReactNode } from 'react'
import type { MenuTypes } from '../containers/Navigation/dataNavigation/dataNavigation'

export interface Size {
	width: number
	height: number
}

export type MenuElement = (data: MenuTypes, id: number, key: number) => JSX.Element


export interface SearchProps {
  isOpen?:boolean,
  handleIsOpen?: () => void
  
}

export type SocialProps = {
	path: string
	icon: ReactNode
}

