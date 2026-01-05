import { use } from 'react'
import { MenuContext } from '../context/menuContext'

const useMenuContext = () => {
	const context = use(MenuContext)

	if (!context) {
		throw new Error('Must be use with a ExampleProvider')
	}

	return context
}

export default useMenuContext
