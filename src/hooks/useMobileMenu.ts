import { useState, useCallback } from 'react'
import { MobileMenuState, type MobileMenuTypes } from '../types/types'




export const useMobileMenu = () => {
	const [state, setState] = useState<MobileMenuTypes>(MobileMenuState.CLOSED)

	const open = useCallback(() => {
		if (state !== MobileMenuState.CLOSED) return

		setState(MobileMenuState.OPENING)
		setTimeout(() => {
			setState(MobileMenuState.OPEN)
		}, 100)
	}, [state])

	const close = useCallback(() => {
		if (state !== MobileMenuState.OPEN) return

		setState(MobileMenuState.CLOSING)
		setTimeout(() => {
			setState(MobileMenuState.CLOSED)
		}, 500)
	}, [state])

	const toggle = useCallback(() => {
        
		if (state === MobileMenuState.OPEN) close()
		else if (state === MobileMenuState.CLOSED) open()
	}, [state, open, close])
   
	return {
		
		isOpen: state === MobileMenuState.OPEN,
		isVisible: state !== MobileMenuState.CLOSED,
		close,
		toggle,
	}
}
