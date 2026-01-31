import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'

import styles from './ResetPassword.module.scss'
import { CheckSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import FormBtn from '../../atoms/FormBtn/FormBtn'
import { useConfirmResetPasswordMutation, useFetchUserProfileQuery } from '../../../slices/api/userApi'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import AccountInputBox from '../../modules/AccountInputBox/AccountInputBox'
import APIResponseMessage from '../../atoms/APIResponseMessage/APIResponseMessage'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { Navigate, useLocation } from 'react-router'

import useMenuContext from '../../../hooks/useMenuContext'
import WrapperBox from '../../atoms/WrapperBox/WrapperBox'

const ResetPassword = () => {
	const { data } = useFetchUserProfileQuery({})
	const [confirmResetPassowrd, { isLoading }] = useConfirmResetPasswordMutation()
	const { signOut } = useMenuContext()
	const { email = '' } = data ?? {}
	const [successMessage, setSuccessMessage] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [enabledButton, setEnabledButton] = useState<boolean>(false)

	const { search } = useLocation()
	const query = new URLSearchParams(search)
	const token = query.get('token')

	const [dataPass, setDataPass] = useState({
		newPassword: '',
		confirmPassword: '',
	})
	const splitEmail = email?.split('@')
	const emailPrefix = splitEmail[0]
	const isEmpty = dataPass.newPassword.length < 1
	const isEmailInPassword = emailPrefix && dataPass.newPassword.toLowerCase().includes(emailPrefix.toLowerCase())
	const isValidLength = dataPass.newPassword.length >= 8
	const isErrorLength = dataPass.newPassword.length > 0 && dataPass.newPassword.length < 8

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget

		const { value, name } = target

		setDataPass(data => ({ ...data, [name]: value }))
	}
	useEffect(() => {
		if (
			dataPass.newPassword &&
			dataPass.newPassword.length >= 8 &&
			dataPass.newPassword === dataPass.confirmPassword &&
			!isEmailInPassword
		) {
			setEnabledButton(true)
		} else {
			setEnabledButton(false)
		}
	}, [dataPass.confirmPassword, dataPass.newPassword, isEmailInPassword])

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			const { newPassword } = dataPass

			const res = await confirmResetPassowrd({ newPassword, token }).unwrap()

			if (res) {
				setSuccessMessage(res.message)
				setDataPass({
					newPassword: '',
					confirmPassword: '',
				})
				signOut()
			}
			if (errorMessage) setErrorMessage('')
		} catch (error) {
			if (typeof error === 'object' && error !== null) {
				const fetchError = error as FetchBaseQueryError
				const message =
					fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data
						? (fetchError.data.message as string)
						: 'An unexpected error has occured'

				setErrorMessage(message)
				setSuccessMessage('')
			} else {
				setErrorMessage('An unexpected error has occured')
			}
		}
	}
	if (!token) return <Navigate to="/" replace />
	return (
		<div className={styles.resetPasswordContainer}>
			<h3 className={styles.title}>Reset password</h3>
			
			<WrapperBox>
				<p className={styles.boxTitle}>Password</p>
				{(successMessage || errorMessage) && (
					<APIResponseMessage messageType={successMessage ? 'succes' : 'error'}>
						{successMessage ? successMessage : <>{errorMessage}</>}
					</APIResponseMessage>
				)}
				<form onSubmit={e => handleSubmit(e)} className={styles.formContainer} aria-busy={isLoading}>
					<AccountInputBox
						id="newPassword"
						
						value={dataPass.newPassword}
						label="New Password"
						type="password"
						onChangeInput={onChangeInput}
						isSubmitting={isLoading}>
						<ul className={styles.newPasswordInfo}>
							<li className={`${isValidLength ? styles.highlightLi : isErrorLength ? styles.errorLi : ''}`}>
								<CheckSVG className={styles.checkSVG} />
								<span>Must Be at least 8 characters</span>
							</li>
							<li className={`${isEmailInPassword ? styles.errorLi : !isEmpty ? styles.highlightLi : ''}`}>
								<CheckSVG className={styles.checkSVG} />
								<span>Does not contain your email address</span>
							</li>
						</ul>
					</AccountInputBox>

					<AccountInputBox
						id="confirmPassword"
						
						value={dataPass.confirmPassword}
						type="password"
						label="Confirm Password"
						onChangeInput={onChangeInput}
						isSubmitting={isLoading}></AccountInputBox>
					<div className={styles.formBtns}>
						<FormBtn
							type="submit"
							isSubmitting={!enabledButton}
							className={`${styles.saveChanges} ${enabledButton ? styles.enabledChanges : ''}`}>
							Save Changes
						</FormBtn>
						<AnchorLink href="/account" className={styles.cancelReset}>
							Cancel
						</AnchorLink>
					</div>
				</form>
			</WrapperBox>
		</div>
	)
}

export default ResetPassword
