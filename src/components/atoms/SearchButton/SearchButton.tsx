import { useDispatch } from 'react-redux'
import { SearchSvg } from '../../../assets/icons/nav/SearchSvg'

import styles from './SearchButton.module.scss'
import { setIsOpen } from '../../../slices/themeSlice'


const SearchButton = () => {
	
	const dispatch = useDispatch()

	const handleOpen = () => {
		dispatch(setIsOpen(true))
	}

	

	return (
		<button className={styles.search} onClick={() => handleOpen()} title='Search'>
			<SearchSvg styles={styles} />
		</button>
	)
}

export default SearchButton
