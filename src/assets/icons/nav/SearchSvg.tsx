import styles from './navIcons.module.scss'

export const SearchSvg = ({ className }: { className: string }) => {
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
