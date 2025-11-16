import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'

import {  type RefObject } from 'react'
import ControlPanelSignIn from '../../atoms/ControlPanelSignIn/ControlPanelSignIn'
import ControlPanelUser from '../../atoms/ControlPanelUser/ControlPanelUser'
import useMenuContext from '../../../hooks/useMenuContext'

interface ControlPanelProps<T extends HTMLElement> {
	styles: Record<string, string>
	index: number
	userRef?: RefObject<T | null>
	
	
	openCloseUserMenu?: () => void
}

const ControlPanel = <T extends HTMLDivElement>({
	styles,
	index,
	userRef,
	
	openCloseUserMenu,
}: ControlPanelProps<T>) => {
	const { isLogged } = useSelector((state: RootState) => state.auth)
	const {handleOpenCloseDropdown}= useMenuContext()
	

	return (
		<div
			className={styles.controlPanelContainer}
			data-element={index}
			onClick={e => handleOpenCloseDropdown(e, index)}>
			{!isLogged ? (
				<ControlPanelSignIn styles={styles} openCloseUserMenu={openCloseUserMenu} userRef={userRef} />
			) : (
				<ControlPanelUser styles={styles} userRef={userRef} openCloseUserMenu={openCloseUserMenu} />
			)}
		</div>
	)
}

export default ControlPanel
