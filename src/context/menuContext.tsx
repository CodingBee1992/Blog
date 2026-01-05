import { createContext, useEffect, useRef, type MouseEvent, type ReactNode, type RefObject } from 'react'
import styles from './menuContext.module.scss'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useLogOutMutation, userApi } from '../slices/api/userApi'
import { setLogout } from '../slices/authSlice'
import { postApi } from '../slices/api/postApi'
import { commentsApi } from '../slices/api/commentsApi'
import { statisticApi } from '../slices/api/statisticsApi'
import { postLikeApi } from '../slices/api/postLikeApi'
import { categoryApi } from '../slices/api/categoriesApi'
interface MenuContextProps {
	children: ReactNode
}

interface CreateContextProps {
	handleOpenCloseMenu: () => void
	openCloseUserMenu: (args: { e: MouseEvent<HTMLElement>; userRef: RefObject<HTMLDivElement | null> }) => void
	handleOpenCloseDropdown: (e: MouseEvent<HTMLElement>, index: number) => void
	signOut: () => void
	navRef: RefObject<HTMLDivElement | null>
	mobileRef: RefObject<HTMLDivElement | null>
	userRef: RefObject<HTMLDivElement | null>
}

const MenuContext = createContext<CreateContextProps | null>(null)

const MenuProvider = ({ children }: MenuContextProps) => {
	const navRef = useRef<HTMLDivElement>(null)
	const mobileRef = useRef<HTMLDivElement>(null)
	const userRef = useRef<HTMLDivElement>(null)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [logOut] = useLogOutMutation()

	// Open Close mobile menu context
	const handleOpenCloseMenu = () => {
		if (!mobileRef.current?.classList.contains(styles.showHide)) {
			mobileRef.current?.classList.add(styles.showHide)

			setTimeout(() => {
				mobileRef.current?.classList.add(styles.fadeIn)
			}, 100)
		} else {
			mobileRef.current?.classList.remove(styles.fadeIn)

			setTimeout(() => {
				mobileRef.current?.classList.remove(styles.showHide)
			}, 500)
		}
	}
	// Open close mobile dropdown
	const handleOpenCloseDropdown = (e: MouseEvent<HTMLElement>, index: number) => {
		const target = e.currentTarget as HTMLElement
		let element

		if (Number(target.dataset.element) === index) {
			element = target

			if (!element.classList.contains(styles.active)) {
				const activeElements = document.querySelectorAll(`.${styles.active}`)

				if (activeElements) {
					activeElements.forEach(item => {
						item.classList.remove(styles.active)
					})
				}

				element.classList.add(styles.active)
				mobileRef.current?.classList.add(styles.overflowActive)
			} else {
				element.classList.remove(styles.active)
				mobileRef.current?.classList.remove(styles.overflowActive)
			}
		}
	}

	const openCloseUserMenu = ({
		e,
		userRef,
	}: {
		e: MouseEvent<HTMLElement>
		userRef: RefObject<HTMLDivElement | null>
	}) => {
		const el = userRef.current as HTMLDivElement
		el.classList.toggle(styles.displayVisibility)
		const target = e.target as HTMLElement

		if (!target) return
		target.classList.toggle(styles.activeMenu)
	}

	useEffect(() => {
		const handleClickOutside = (e: globalThis.MouseEvent) => {
			const el = userRef.current
			const target = e.target as HTMLElement

			if (!el || !target) return

			if (
				el.classList.contains(styles.displayVisibility) &&
				!el.contains(target) &&
				!target.classList.contains(styles.activeMenu)
				// !target.classList.contains(styles.authorAvatar) &&
				// !target.classList.contains(styles.signInBtn)
			) {
				el.classList.remove(styles.displayVisibility)
			}
		}

		window.addEventListener('mousedown', handleClickOutside)
		return () => window.removeEventListener('mousedown', handleClickOutside)
	}, [])

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		const timer = setTimeout(() => {
	// 			navigate('/')
	// 			window.scrollTo({ top: 0, behavior: 'instant' })
	// 		}, 300)

	// 		return () => clearTimeout(timer)
	// 	}
	// }, [isSuccess, navigate])

	const signOut = async () => {
		try {
			await logOut({}).unwrap()

			dispatch(setLogout())

			dispatch(postApi.util.resetApiState())
			dispatch(commentsApi.util.resetApiState())
			dispatch(userApi.util.resetApiState())
			dispatch(statisticApi.util.resetApiState())
			dispatch(postLikeApi.util.resetApiState())
			dispatch(categoryApi.util.resetApiState())

			navigate('/')
			window.scrollTo({ top: 0, behavior: 'instant' })
		} catch (error) {
			console.log('Error during logout:', error)
		}
	}

	const value: CreateContextProps = {
		openCloseUserMenu,
		handleOpenCloseMenu,
		handleOpenCloseDropdown,
		signOut,
		navRef,
		mobileRef,
		userRef,
	}

	return <MenuContext value={value}>{children}</MenuContext>
}

export { MenuContext, MenuProvider }
