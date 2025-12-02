import { Navigate, useLocation } from 'react-router'
import { useResendVerificationMutation, useVerifyAccountQuery } from '../../../slices/api/loginSlice'
import styles from './VerifyPageTemplate.module.scss'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useEffect, useState } from 'react'
const VerifyPageTemplate = () => {
	const { search } = useLocation()

	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)
	const [disabled, setDisabled] = useState<boolean>(false)
	const [countdown, setCountdown] = useState<number>(0)
	const query = new URLSearchParams(search)
	const token = query.get('token')
	const email = query.get('email')

	const { data, error, isLoading } = useVerifyAccountQuery(token)
	const [resendVerificationToken] = useResendVerificationMutation()

	useEffect(() => {
		if (typeof error === 'object' && error !== null) {
			const fetchError = error as FetchBaseQueryError
			const message =
				fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data
					? (fetchError.data.message as string)
					: 'Something goes wrong'

			setMessage(message)
			setErrorMessage(message)
		}
	}, [error])

	const handleResendVerificationToken = async () => {
		const res = await resendVerificationToken(email)

		if (res.data?.message) {
			setMessage(res.data.message)
		}
		setDisabled(true)
		setCountdown(60)
		const interval = setInterval(() => {
			setCountdown(prev => {
				if (prev <= 1) {
					clearInterval(interval)
					setDisabled(false)
					return 0
				}
				return prev - 1
			})
		}, 1000)
	}
	if (data?.isVerified) return <Navigate to={'/'} replace />
	if (!token) return <Navigate to={'/'} replace />
	if (isLoading) return null
	return (
		<div className={styles.verifyContainer}>
			<div className={styles.verifyWrapper}>
				<h2>Email Verification</h2>
				<div className={styles.verifyBox}>
					{errorMessage && <p>Upsss...</p>}
					<p>{message}</p>

					<button disabled={disabled} onClick={() => handleResendVerificationToken()}>
						{disabled ? `Wait ${countdown}` : 'Sent Again'}
					</button>

					<span>Click on the link in the email to activate your account</span>
				</div>
			</div>
		</div>
	)
}

export default VerifyPageTemplate
