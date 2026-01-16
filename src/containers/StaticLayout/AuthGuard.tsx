import { type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import type { RootState } from '../../store'

const AuthGuard = ({ children }: { children: ReactNode }) => {
	const { isLogged, justLoggedOut } = useSelector((state: RootState) => state.auth)

	if (!isLogged && !justLoggedOut) return <Navigate to="/login" replace />

	return <div>{children}</div>
}

export default AuthGuard
