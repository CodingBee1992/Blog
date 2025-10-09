import { useRef, useState, type FormEvent } from 'react'
import type { SearchProps } from '../../../types/types'
import styles from './SearchContainer.module.scss'
import CloseButton from '../../atoms/CloseButton/CloseButton'
import { useDispatch } from 'react-redux'
import { setIsOpen } from '../../../slices/themeSlice'
import useDebounce from '../../../hooks/useDebounce'

const SearchContainer = ({ isOpen }: SearchProps) => {
	const searchContainerRef = useRef<HTMLDivElement>(null)
	const searchRef = useRef<HTMLDivElement>(null)
	const searchListRef = useRef<HTMLDivElement>(null)
	const [value, setValue ] = useState<string>('')

	const debouncedValue = useDebounce(value,500)

	if (isOpen) {
		setTimeout(() => {
			searchContainerRef.current?.classList.add(styles.fadeIn)
		}, 50)
		setTimeout(() => {
			searchRef.current?.classList.add(styles.show)
		}, 300)
	}

	const dispatch = useDispatch()

	const handleClose = () => {
		setTimeout(() => {
			searchRef.current?.classList.remove(styles.show)
		}, 50)
		setTimeout(() => {
			searchContainerRef.current?.classList.remove(styles.fadeIn)
		}, 600)

		setTimeout(() => {
			dispatch(setIsOpen(false))
		}, 1000)
	}

	const searchInput = (e: FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement
		setValue(target.value)

	}
	if (debouncedValue) {
		searchListRef.current?.classList.add(styles.fadeOut)

		setTimeout(() => {
			searchListRef.current?.classList.add(styles.height)
		}, 50);
	} else {
		searchListRef.current?.classList.remove(styles.fadeOut)
		searchListRef.current?.classList.remove(styles.height)
	}

	return (
		<div ref={searchContainerRef} className={styles.container}>
			<div ref={searchRef} className={styles.searchContainer}>
				<div className={styles.elementSearchContainer}>
					<form action="" className={styles.elementSearchForm}>
						<input
							value={value}
							name="search"
							type="search"
							placeholder="Search for..."
							className={styles.input}
							autoComplete="off"
							onInput={e => searchInput(e)}
						/>
					</form>
					<div ref={searchListRef} className={`${styles.elementSearchList}`}>
						<a href="" className={styles.elementSearchListLink}>
							Zachody słońca w Afryce
						</a>
						<a href="" className={styles.elementSearchListLink}>
							Pustynie w Namibii
						</a>
						<a href="" className={styles.elementSearchListLink}>
							Peru - słońce Ameryki Południowej
						</a>
						<a href="" className={styles.elementSearchListLink}>
							Peru - słońce Ameryki Południowej
						</a>
						<a href="" className={styles.elementSearchListLink}>
							Peru - słońce Ameryki Południowej
						</a>
						<a href="" className={styles.elementSearchListLink}>
							Peru - słońce Ameryki Południowej
						</a>
						<a href="" className={styles.elementSearchListLink}>
							Peru - słońce Ameryki Południowej
						</a>
					</div>
				</div>

				<CloseButton handleClose={handleClose} />
			</div>
		</div>
	)
}

export default SearchContainer
