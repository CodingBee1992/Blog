import { createContext, useRef, type MouseEvent, type ReactNode, type RefObject } from 'react'
import styles from './menuContext.module.scss'
interface MenuContextProps {
	children: ReactNode
}

interface CreateContextProps {
	handleOpenCloseMenu: (args: { mobileRef: RefObject<HTMLDivElement | null> }) => void
	openCloseUserMenu: (args: { userRef: RefObject<HTMLDivElement | null> }) => void
	handleOpenCloseDropdown: (e: MouseEvent<HTMLElement>, index: number) => void
	navRef: RefObject<HTMLDivElement | null>
	mobileRef: RefObject<HTMLDivElement | null>
	userRef: RefObject<HTMLDivElement | null>
}

const MenuContext = createContext<CreateContextProps | null>(null)

const MenuProvider = ({ children }: MenuContextProps) => {
	const navRef = useRef<HTMLDivElement>(null)
	const mobileRef = useRef<HTMLDivElement>(null)
	const userRef = useRef<HTMLDivElement>(null)

	// Open Close mobile menu context
	const handleOpenCloseMenu = ({ mobileRef }: { mobileRef: RefObject<HTMLDivElement | null> }) => {
		if (!mobileRef.current?.classList.contains(styles.showHide)) {
			mobileRef.current?.classList.add(styles.showHide)

			setTimeout(() => {
				mobileRef.current?.classList.add(styles.fadeIn)
			}, 100)
		} else {
			mobileRef.current?.classList.remove(styles.fadeIn)
			console.log('ok')

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

	const openCloseUserMenu = ({ userRef }: { userRef: RefObject<HTMLDivElement | null> }) => {
		const el = userRef.current as HTMLDivElement
		el.classList.toggle(styles.displayVisibility)
	}

	const value: CreateContextProps = {
		openCloseUserMenu,
		handleOpenCloseMenu,
		handleOpenCloseDropdown,
		navRef,
		mobileRef,
		userRef,
	}

	return <MenuContext value={value}>{children}</MenuContext>
}

export { MenuContext, MenuProvider }
