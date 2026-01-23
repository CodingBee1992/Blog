import type { Ref } from "react"

interface MenuArrowSVGProps {
	styles: { [key: string]: string }
    arrowRef?:Ref<SVGSVGElement | null>
	className?:string
}

export const MenuArrowSVG = ({ styles, arrowRef,className }: MenuArrowSVGProps) => {
	return (
		<svg
			ref={arrowRef}
			className={`${styles.arrow} ${className ? className : ''}`}
			width="9"
			height="6"
			viewBox="0 0 9 6"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path d="M1 1.25L2.75 3L4.5 4.75L8 1.25" stroke="currentColor" strokeLinecap="round" />
		</svg>
	)
}
