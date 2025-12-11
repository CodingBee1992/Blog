import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import type { RootState } from '../../store'

interface AdminRouteProps {
	children: ReactNode
}

const AdminRoute = ({ children }: AdminRouteProps) => {
	const { isLogged,role } = useSelector((state: RootState) => state.auth)
	const [showMessage, setShowMessage] = useState<boolean>(false)
	const [redirect, setRedirect] = useState<boolean>(false)
	const prevLogged = useRef<boolean | null>(null)
	
	
	useEffect(() => {
		if (prevLogged.current === true && isLogged === false) {
			setShowMessage(false)
			prevLogged.current = isLogged
			return
		}

		if (!isLogged || (role !== 'Admin' && role !== 'Moderator')) {
			setShowMessage(true)

			const timer = setTimeout(() => {
				setRedirect(true)
			}, 2000)
			return () => clearTimeout(timer)
		}

		setShowMessage(false)
		setRedirect(false)
		prevLogged.current = isLogged
	}, [role, isLogged])

	if (!isLogged && redirect) {
		return <Navigate to="/login" replace />
	}

	if ((role !== 'Admin' && role !== 'Moderator') && redirect) {
		return <Navigate to="/" replace />
	}

	if (showMessage) {
		return (
			<>
				<div style={{ padding: '10rem', textAlign: 'center', color: 'white' }}>
					<h2>Nie masz dostępu do tej strony</h2>
					<p>Za chwilę zostaniesz przekierowany na stronę {!isLogged ? 'logowania' : 'główną'}</p>
				</div>
			</>
		)
	}

	return <>{children}</>
}

export default AdminRoute
