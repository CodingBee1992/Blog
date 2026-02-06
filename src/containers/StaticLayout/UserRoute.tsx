import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { Navigate, Outlet } from 'react-router'
import { MenuProvider } from '../../context/menuContext'

const UserRoute = () => {
	const { isLogged } = useSelector((state: RootState) => state.auth)

	if (isLogged) return <Navigate to="/" replace />

	return (
		<>
			<MenuProvider>
				<Outlet />
			</MenuProvider>
		</>
	)
}

export default UserRoute
