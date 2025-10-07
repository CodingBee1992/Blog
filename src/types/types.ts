import type { JSX } from 'react'
import type { MenuTypes } from '../containers/Navigation/dataNavigation/dataNavigation'

export interface Size {
	width: number
	height: number
}

export type MenuElement = (data: MenuTypes, id: number, key: number) => JSX.Element
