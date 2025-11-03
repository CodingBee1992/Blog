import type { ReactNode, RefObject } from 'react'
import { removePaginationLinksTags } from '../../../utils/removePaginationLinksTag'
import styles from './AnchorLink.module.scss'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../../../slices/themeSlice'
interface AnchorLink {
	children: ReactNode
	href: string
	rel?: string
	target?: string
	className?: string
	count?: number
	ariaLabel?: string
	ref?:RefObject<HTMLAnchorElement | null>
}

const AnchorLink = ({ children, href, rel, target, count, className, ariaLabel,ref }: AnchorLink) => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const isActive = location.pathname === href

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		
		removePaginationLinksTags()

		
		const url = new URL(window.location.origin + href)
		const path = url.pathname
		const search = url.search
		
		const hash = url.hash.replace('#', '')

		if (location.pathname !== path || location.search !== search) {
			setTimeout(() => {
				navigate({ pathname: path, search, hash: hash ? `#${hash}` : undefined })
			}, 200)

			setTimeout(() => {
				window.scrollTo({ top: 0, behavior: 'smooth' })
			}, 210)
		}
		dispatch(setIsLoading(true))
	}

	return (
		<a
			href={href}
			ref={ref}
			onClick={e => handleClick(e)}
			rel={rel}
			target={target}
			aria-label={ariaLabel}
			data-main={count}
			className={`${className ? className : ''} ${isActive ? styles.isActive : ''} `}>
			{children}
		</a>
	)
}

export default AnchorLink
