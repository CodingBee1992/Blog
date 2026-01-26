import { useCallback, useState } from 'react'

export const useMobileSideBarMenu = () => {
	const [active, setActive] = useState<boolean>(false)

	const open = useCallback(() => setActive(true), [])
	const close = useCallback(() => setActive(false), [])
	const toggle = useCallback(() => {
		setActive(prev => !prev)
	}, [])

	return {
		active,
		open,
		close,
		toggle,
	}
}


