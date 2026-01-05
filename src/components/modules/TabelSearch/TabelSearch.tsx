import { type ChangeEvent } from 'react'
import { SearchSvg } from '../../../assets/icons/nav/SearchSvg'

interface TabelSearchProps {
	styles: Record<string, string>
	handleSetInputValue: (e: ChangeEvent<HTMLInputElement>) => void
}

const TabelSearch = ({ styles, handleSetInputValue }:TabelSearchProps) => {
	return (
		<div className={styles.searchContainer}>
			<label htmlFor='search' className={styles.searchBox}>
				<input
				id='search'
					className={styles.searchInput}
					type="text"
					placeholder="Search..."
					onChange={e => handleSetInputValue(e)}
				/>
				<button aria-label='search button' className={styles.searchBtn}>
					<SearchSvg className={styles.searchIcon} />
				</button>
			</label>
		</div>
	)
}

export default TabelSearch
