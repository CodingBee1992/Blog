import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'

import ControlPanelSignIn from '../../atoms/ControlPanelSignIn/ControlPanelSignIn'
import ControlPanelUser from '../../atoms/ControlPanelUser/ControlPanelUser'
import useMenuContext from '../../../hooks/useMenuContext'

interface ControlPanelProps {
	styles: Record<string, string>
	index: number

}

const ControlPanel = ({
	styles,
	index,
	
}: ControlPanelProps) => {
	const { isLogged } = useSelector((state: RootState) => state.auth)
	const {handleOpenCloseDropdown}= useMenuContext()
	

	return (
		<div
			className={styles.controlPanelContainer}
			data-element={index}
			onClick={e => handleOpenCloseDropdown(e, index)}>
			{!isLogged ? (
				<ControlPanelSignIn styles={styles} />
			) : (
				<ControlPanelUser styles={styles} />
			)}
		</div>
	)
}

export default ControlPanel
