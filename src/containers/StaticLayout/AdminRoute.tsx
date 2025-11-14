import { useEffect, useState, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import type { RootState } from '../../store'

interface AdminRouteProps {
	children: ReactNode
}

const AdminRoute = ({ children }: AdminRouteProps) => {
	const { isLogged, isAdmin } = useSelector((state: RootState) => state.auth)
	const [showMessage, setShowMessage] = useState<boolean>(false)
	const [redirect, setRedirect] = useState<boolean>(false)

	useEffect(() => {
		if (!isLogged || !isAdmin) {
			setShowMessage(true)

			const timer = setTimeout(() => {
				setRedirect(true)
			}, 2000)
			return () => clearTimeout(timer)
		} else {
			setShowMessage(false)
			setRedirect(false)
		}
	}, [isAdmin, isLogged])

	if (!isLogged && redirect) {
		return <Navigate to="/login" replace />
	}

	if (!isAdmin && redirect) {
		return <Navigate to="/" replace />
	}

	return (
		<>
			{showMessage && (
				<>
					<div style={{ padding: '10rem', textAlign: 'center', color: 'white' }}>
						<h2>Nie masz dostępu do tej strony</h2>
						<p>Za chwilę zostaniesz przekierowany na stronę {!isLogged ? 'logowania':'główną'}</p>
					</div>
				</>
			)}
			{children}
		</>
	)
}

export default AdminRoute
