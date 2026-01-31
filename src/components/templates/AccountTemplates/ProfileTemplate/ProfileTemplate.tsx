import {
	useChangeEmailAddressMutation,
	useChangePasswordMutation,
	useResetPasswordMutation,
	useFetchUserProfileQuery
} from '../../../../slices/api/userApi'
import FormBtn from '../../../atoms/FormBtn/FormBtn'

import styles from './ProfileTemplate.module.scss'

import { CheckSVG } from '../../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import { useEffect, useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import AccountPopup from '../../../atoms/AccountPopup/AccountPopup'
import AccountInputBox from '../../../modules/AccountInputBox/AccountInputBox'
import AnchorLink from '../../../atoms/AnchorLink/AnchorLink'
import APIResponseMessage from '../../../atoms/APIResponseMessage/APIResponseMessage'

import WrapperBox from '../../../atoms/WrapperBox/WrapperBox'
import Profile from '../../../organism/Profile/Profile'


const ProfileTemplate = () => {
	const [changePassword] = useChangePasswordMutation()
	const [resetPassword] = useResetPasswordMutation()
	const [changeEmailAddress] = useChangeEmailAddressMutation()
	const {data: profileData} = useFetchUserProfileQuery()
	console.log(profileData)
	const {email,name,avatar} = profileData
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [successMessage, setSuccessMessage] = useState<string>('')

	const [popupErrorMessage, setPopupErrorMessage] = useState<string>('')
	const [popupSuccessMessage, setPopupSuccesMessage] = useState<string>('')
	const [accountPopup, setAccountPopup] = useState<boolean>(false)
	const [enabledButton, setEnabledButton] = useState<boolean>(false)
	
	const [isEmail, setIsEmail] = useState<string>('')
	const [dataPass, setDataPass] = useState<Record<string, string>>({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	})
	
	const isValidLength = dataPass.newPassword.length >= 8
	const isErrorLength = dataPass.newPassword.length > 0 && dataPass.newPassword.length < 8
	const splitEmail = email?.split('@')
	const emailPrefix = splitEmail[0]
	const splitPrefix = emailPrefix.split('')

	const popupEmail = `${splitPrefix[0]}...${splitPrefix[splitPrefix.length - 1]}@${splitEmail[1]}`

	const isEmpty = dataPass.newPassword.length < 1
	const isEmailInPassword = emailPrefix && dataPass.newPassword.toLowerCase().includes(emailPrefix.toLowerCase())

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget
		const { value, name } = target

		setDataPass(data => ({ ...data, [name]: value }))
	}

	useEffect(() => {
		if (
			dataPass.currentPassword &&
			dataPass.newPassword &&
			dataPass.newPassword.length >= 8 &&
			dataPass.newPassword === dataPass.confirmPassword &&
			!isEmailInPassword
		) {
			setEnabledButton(true)
		} else {
			setEnabledButton(false)
		}
	}, [dataPass.confirmPassword, dataPass.currentPassword, dataPass.newPassword, isEmailInPassword])

	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage('')
			}, 3000)

			return () => clearTimeout(timer)
		}

		if (errorMessage) {
			const timer = setTimeout(() => {
				setErrorMessage('')
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [errorMessage, successMessage])

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			const { newPassword, currentPassword } = dataPass

			const res = await changePassword({ newPassword, currentPassword }).unwrap()

			if (res) {
				setSuccessMessage(res.message)
				setDataPass({
					currentPassword: '',
					newPassword: '',
					confirmPassword: '',
				})
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

	const handleAccountPopup = (e: MouseEvent<HTMLButtonElement>) => {
		const { id } = e.currentTarget

		setIsEmail(id)
		setAccountPopup(true)

		if (popupErrorMessage) setPopupErrorMessage('')
		if (popupSuccessMessage) setPopupSuccesMessage('')
	}

	const handleSendEmail = async () => {
		try {
			if (isEmail === 'email') {
				const res = await changeEmailAddress({}).unwrap()

				if (res) setPopupSuccesMessage(res.message)
				return
			}
			const res = await resetPassword({}).unwrap()

			if (res) setPopupSuccesMessage(res.message)
			setPopupErrorMessage('')
		} catch (error) {
			if (typeof error === 'object' && error !== null) {
				const fetchError = error as FetchBaseQueryError
				const message =
					fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data
						? (fetchError.data.message as string)
						: 'An unexpected error has occured'

				if (message) setPopupErrorMessage(message)
			} else {
				setPopupErrorMessage('An unexpected error has occured')
			}
		}
	}
	return (
		<div className={styles.profileTemplateContainer}>
			<h2 className={styles.title}>Profile Info</h2>
			<div className={styles.profileWrapper}>
				<Profile />
				<WrapperBox>
					<p className={styles.boxTitle}>Email Address</p>
					<label htmlFor="email" className={styles.profileLabel}>
						<input
							type="email"
							id="email"
							readOnly
							value={email ?? ''}
							className={` ${styles.profileEmail} ${styles.profileEmailDisabled}`}
						/>
					</label>
					<button id="email" onClick={e => handleAccountPopup(e)} className={styles.changeEmail}>
						Change Email Address
					</button>
				</WrapperBox>
				<WrapperBox>
					<p className={styles.boxTitle}>Password</p>

					{(successMessage || errorMessage) && (
						<APIResponseMessage messageType={successMessage ? 'succes' : 'error'}>
							{successMessage ? successMessage : <>{errorMessage}</>}
						</APIResponseMessage>
					)}
					<form onSubmit={e => handleSubmit(e)} className={styles.formContainer}>
						<AccountInputBox
							id="currentPassword"
							label="Current Password"
							value={dataPass.currentPassword}
							type="password"
							onChangeInput={onChangeInput}>
							<button
								id="reset"
								type="button"
								onClick={e => handleAccountPopup(e)}
								aria-label="Reset password"
								className={styles.resetPassword}>
								Reset Password
							</button>
						</AccountInputBox>

						<AccountInputBox
							id="newPassword"
							label="New Password"
							value={dataPass.newPassword}
							type="password"
							onChangeInput={onChangeInput}>
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
							label="Confirm Password"
							type="password"
							value={dataPass.confirmPassword}
							onChangeInput={onChangeInput}></AccountInputBox>

						<FormBtn
							type="submit"
							isSubmitting={!enabledButton}
							className={`${styles.saveChanges} ${enabledButton ? styles.enabledChanges : ''}`}>
							Save Changes
						</FormBtn>
					</form>
				</WrapperBox>
				<WrapperBox>
					<p className={styles.boxTitle}>Delete Account</p>
					<p>You will lose access to your account once your deletion request has been submitted.</p>

					<AnchorLink href="/account/delete" ariaLabel="Delete account" className={styles.deleteAccount}>
						Delete Account
					</AnchorLink>
				</WrapperBox>
			</div>
			{accountPopup && (
				<AccountPopup
					popupSuccessMessage={popupSuccessMessage}
					popupErrorMessage={popupErrorMessage}
					popupEmail={popupEmail}
					popupTitle="Confirm Identity"
					setAccountPopup={setAccountPopup}
					handleSendEmail={handleSendEmail}
					setIsEmail={setIsEmail}
				/>
			)}
		</div>
	)
}

export default ProfileTemplate
