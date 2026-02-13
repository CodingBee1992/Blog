import { useDispatch } from 'react-redux'
import styles from './SearchButton.module.scss'
import { setIsOpen } from '../../../slices/themeSlice'
import { SearchSVG } from '../../../assets/icons/Icons'

const SearchButton = () => {
	const dispatch = useDispatch()

	const handleOpen = () => {
		dispatch(setIsOpen(true))
	}

	return (
		<button className={styles.search} onClick={() => handleOpen()} title="Search">
			<SearchSVG className={styles.icon} />
		</button>
	)
}

export default SearchButton
