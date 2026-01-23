import { createContext, useEffect, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from 'react'

import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { useLogOutMutation, userApi } from '../slices/api/userApi'
import { setLogout } from '../slices/authSlice'
import { postApi } from '../slices/api/postApi'
import { commentsApi } from '../slices/api/commentsApi'
import { statisticApi } from '../slices/api/statisticsApi'
import { postLikeApi } from '../slices/api/postLikeApi'
import { categoryApi } from '../slices/api/categoriesApi'
import { useMobileMenu } from '../hooks/useMobileMenu'
interface MenuContextProps {
	children: ReactNode
}

interface CreateContextProps {
	openCloseUserMenu: () => void
	handleOpenCloseDropdown: (e: MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void
	signOut: () => void
	navRef: RefObject<HTMLDivElement | null>
	userRef: RefObject<HTMLDivElement | null>
	scrollMenu: boolean
	mobileMenu: ReturnType<typeof useMobileMenu>
	activeIndex: number | null
	toggleMenu: boolean
}

const MenuContext = createContext<CreateContextProps | null>(null)

const MenuProvider = ({ children }: MenuContextProps) => {
	const navigate = useNavigate()
	const [logOut] = useLogOutMutation()
	const { pathname } = useLocation()
	const dispatch = useDispatch()
	const mobileMenu = useMobileMenu()
	const navRef = useRef<HTMLDivElement>(null)
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const userRef = useRef<HTMLDivElement>(null)
	const [scrollMenu, setScrollMenu] = useState<boolean>(false)
	const [toggleMenu, setToggleMenu] = useState<boolean>(false)

	// Open close mobile dropdown
	const handleOpenCloseDropdown = (e: MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
		const target = e.currentTarget
		const element = Number(target.dataset.element)

		if (Number.isNaN(element)) return
		if (activeIndex === element) {
			setActiveIndex(null)
			setScrollMenu(false)
		} else {
			setActiveIndex(element)
			setScrollMenu(true)
		}
	}

	const openCloseUserMenu = () => {
		setToggleMenu(prev => !prev)
	}
	

	useEffect(() => {
		const handleClickOutside = (e: globalThis.MouseEvent) => {
			const el = userRef.current
			if (!el) return

			if (!el.contains(e.target as Node)) {
				setToggleMenu(false)
			}
		}

		window.addEventListener('mousedown', handleClickOutside)
		return () => window.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const signOut = async () => {
		try {
			dispatch(setLogout())

			await logOut({})

			dispatch(postApi.util.resetApiState())
			dispatch(commentsApi.util.resetApiState())
			dispatch(userApi.util.resetApiState())
			dispatch(statisticApi.util.resetApiState())
			dispatch(postLikeApi.util.resetApiState())
			dispatch(categoryApi.util.resetApiState())
			if (pathname !== '/') {
				
				navigate('/')
			}
			window.scrollTo({ top: 0, behavior: 'instant' })
		} catch (error) {
			console.log('Error during logout:', error)
		}
	}

	const value: CreateContextProps = {
		openCloseUserMenu,
		handleOpenCloseDropdown,
		signOut,
		navRef,
		userRef,
		scrollMenu,
		mobileMenu,
		activeIndex,
		toggleMenu,
	}

	return <MenuContext value={value}>{children}</MenuContext>
}

export { MenuContext, MenuProvider }
