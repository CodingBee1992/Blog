import type { Ref } from 'react'
import styles from './Icons.module.scss'
interface IconsProps {
	arrowRef?: Ref<SVGSVGElement | null>
	className?: string
}

export const ChevronDownSVG = ({ arrowRef, className }: IconsProps) => {
	return (
		<svg
			ref={arrowRef}
			className={`${styles.chevronSVG} ${className ? className : ''}`}
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg">
			<path
				fill="currentColor"
				d="M10 14a.997.997 0 01-.707-.293l-5-5a.999.999 0 111.414-1.414L10 11.586l4.293-4.293a.999.999 0 111.414 1.414l-5 5A.997.997 0 0110 14z"
			/>
		</svg>
	)
}

export const ArrowPrev = () => {
	return (
		<svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
			<path d="M1.5 7.5l4-4m-4 4l4 4m-4-4H14" stroke="currentColor"></path>
		</svg>
	)
}
export const ArrowNext = () => {
	return (
		<svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
			<path d="M13.5 7.5l-4-4m4 4l-4 4m4-4H1" stroke="currentColor"></path>
		</svg>
	)
}

export const CloseSvg = ({ className }: IconsProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="red"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={`${styles.closeSVG} ${className ? className : ''}`}>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M18 6l-12 12" />
			<path d="M6 6l12 12" />
		</svg>
	)
}
export const SearchSVG = ({ className }: { className: string }) => {
	return (
		<svg
			className={className ? className : ` ${styles.searchSVG}`}
			width="16"
			height="16"
			viewBox="0 0 17.982 17.983"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				fill="currentColor"
				d="M12.622 13.611l-.209.163A7.607 7.607 0 017.7 15.399C3.454 15.399 0 11.945 0 7.7 0 3.454 3.454 0 7.7 0c4.245 0 7.699 3.454 7.699 7.7a7.613 7.613 0 01-1.626 4.714l-.163.209 4.372 4.371-.989.989-4.371-4.372zM7.7 1.399a6.307 6.307 0 00-6.3 6.3A6.307 6.307 0 007.7 14c3.473 0 6.3-2.827 6.3-6.3a6.308 6.308 0 00-6.3-6.301z"></path>
		</svg>
	)
}





