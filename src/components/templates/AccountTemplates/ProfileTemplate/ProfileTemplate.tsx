import {
	useChangeEmailAddressMutation,
	useChangePasswordMutation,
	useFetchUserProfileQuery,
	useResetPasswordMutation,
	useUpdateProfileMutation,
} from '../../../../slices/api/userApi'
import FormBtn from '../../../atoms/FormBtn/FormBtn'
import ProfileInfoBox from '../../../atoms/ProfileInfoBox/ProfileInfoBox'
import styles from './ProfileTemplate.module.scss'

import { CameraSVG, CheckSVG, WarnSVG } from '../../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import AccountPopup from '../../../atoms/AccountPopup/AccountPopup'
import AccountInputBox from '../../../modules/AccountInputBox/AccountInputBox'
import AnchorLink from '../../../atoms/AnchorLink/AnchorLink'
import APIResponseMessage from '../../../atoms/APIResponseMessage/APIResponseMessage'
import { useFetchCloudinaryMutation } from '../../../../slices/api/cloudinaryApi'
import uploadToCloudinary from '../../../../hooks/useUploadToCloudinary'
import { useDispatch } from 'react-redux'
import { setData } from '../../../../slices/authSlice'
type ProfileData = {
	name: string
	avatar: File | null
}
const ProfileTemplate = () => {
	const uploadFolder = import.meta.env.VITE_UPLOAD_AVATARS
	const { data: profileData } = useFetchUserProfileQuery({})
	const { email = '', name, avatar } = profileData ?? {}
	const dispatch = useDispatch()
	const [changePassword] = useChangePasswordMutation()
	const [resetPassword] = useResetPasswordMutation()
	const [changeEmailAddress] = useChangeEmailAddressMutation()
	const [updateProfile, { data: isSubmitting }] = useUpdateProfileMutation()
	const [createSignature] = useFetchCloudinaryMutation()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [successMessage, setSuccessMessage] = useState<string>('')
	const [profileErrorMessage, setProfileErrorMessage] = useState<string>('')
	const [profileSuccessMessage, setProfileSuccessMessage] = useState<string>('')
	const [popupErrorMessage, setPopupErrorMessage] = useState<string>('')
	const [popupSuccessMessage, setPopupSuccesMessage] = useState<string>('')
	const [accountPopup, setAccountPopup] = useState<boolean>(false)
	const [enabledButton, setEnabledButton] = useState<boolean>(false)
	const [enabledButtonProfile, setEnabledButtonProfile] = useState<boolean>(false)
	const [isEmail, setIsEmail] = useState<string>('')
	const [showImage, setShowImage] = useState<boolean>(false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [dataProfile, setDataProfile] = useState<ProfileData>({
		name: name ?? '',
		avatar: avatar?.src ?? '',
	})
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
	const onChangeInputProfile = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget

		const { value, name, type } = target

		if (type === 'file') {
			const file = target.files?.[0]
			if (!file) return
			
			const maxSizeMB = 3
			if (file.size / 1024 / 1024 > maxSizeMB) {
				setProfileErrorMessage(`Plik musi być mniejszy niż ${maxSizeMB} MB`)
				setDataProfile(data => ({ ...data, avatar: profileData.avatar?.src }))
				if (fileInputRef.current) fileInputRef.current.value = ''
				return
			}

			const objectUrl = URL.createObjectURL(file)
			const img = new Image()
			img.src = objectUrl
			img.onload = () => {
				const { width, height } = img

				// Przykładowa walidacja
				if (width < 128 || height < 128) {
					setProfileErrorMessage('Obraz jest za mały! Minimum 128x128 px')
					setDataProfile(data => ({ ...data, avatar: profileData.avatar?.src }))
					if (fileInputRef.current) fileInputRef.current.value = ''
					return
				}
				if (width > 256 || height > 256) {
					setProfileErrorMessage('Obraz jest za duży! Maksimum 256x256 px')
					setDataProfile(data => ({ ...data, avatar: profileData.avatar?.src }))
					if (fileInputRef.current) fileInputRef.current.value = ''
					return
				}
			}
			setDataProfile(data => ({ ...data, [name]: file }))
		} else {
			setDataProfile(data => ({ ...data, [name]: value }))
		}

		if (dataProfile.name.length > 1) {
			setEnabledButtonProfile(true)
		} else {
			setEnabledButtonProfile(false)
		}
	}

	useEffect(() => {
		if (profileData) {
			setDataProfile({
				name: profileData.name ?? '',
				avatar: profileData.avatar?.src ?? '',
			})
		}
	}, [profileData])

	useEffect(() => {
		if (isSubmitting) {
			setEnabledButtonProfile(true)
		} else {
			setEnabledButtonProfile(false)
		}
	}, [isSubmitting])
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
		if (profileSuccessMessage) {
			const timer = setTimeout(() => {
				setProfileSuccessMessage('')
			}, 3000)

			return () => clearTimeout(timer)
		}

		if (errorMessage) {
			const timer = setTimeout(() => {
				setErrorMessage('')
			}, 3000)

			return () => clearTimeout(timer)
		}
		if (profileErrorMessage) {
			const timer = setTimeout(() => {
				setProfileErrorMessage('')
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [errorMessage, profileErrorMessage, profileSuccessMessage, successMessage])

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
	const handleProfileSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const file = dataProfile.avatar

		let updatedAvatar = {}
		try {
			if (dataProfile.avatar instanceof File) {
				const dataSignature = await createSignature({ uploadFolder }).unwrap()

				const data = await uploadToCloudinary({
					file,
					uploadFolder,
					dataSignature,
				})
				updatedAvatar = { src: data.secure_url, public_id: data.public_id }
			} else {
				updatedAvatar = avatar
			}

			const res = await updateProfile({ name: dataProfile.name, updatedAvatar }).unwrap()

			if (res) setProfileSuccessMessage(res.message)
			
			dispatch(setData(res))
			setEnabledButtonProfile(false)
		} catch (error) {
			if (typeof error === 'object' && error !== null) {
				const fetchError = error as FetchBaseQueryError
				const message =
					fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data
						? (fetchError.data.message as string)
						: 'An unexpected error has occured'

				setProfileErrorMessage(message)
				setProfileSuccessMessage('')
			} else {
				setProfileErrorMessage('An unexpected error has occured')
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
				console.log(res)

				return
			}
			const res = await resetPassword({}).unwrap()
			console.log(res)

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
				<ProfileInfoBox>
					<p className={styles.boxTitle}>Profile</p>

					<form
						onSubmit={e => handleProfileSubmit(e)}
						className={`${styles.formContainer} ${
							profileSuccessMessage || profileErrorMessage ? '' : styles.profileContainer
						}`}>
						<div className={styles.profileBox}>
							{profileErrorMessage && (
								<APIResponseMessage responseMessage={profileErrorMessage} meesageType="error">
									<WarnSVG className={styles.warnSVG} />
								</APIResponseMessage>
							)}
							{profileSuccessMessage && (
								<APIResponseMessage responseMessage={profileSuccessMessage} meesageType="succes"></APIResponseMessage>
							)}
							{/* <APIResponseMessage responseMessage="{profileSuccessMessage}" meesageType="succes"></APIResponseMessage> */}
							<label
								className={styles.avatarBox}
								onMouseEnter={() => setShowImage(true)}
								onMouseLeave={() => setShowImage(false)}>
								<input
									ref={fileInputRef}
									type="file"
									name="avatar"
									id="avatar"
									onChange={e => onChangeInputProfile(e)}
								/>

								{typeof dataProfile.avatar === 'string' ? (
									<img src={dataProfile.avatar} alt="User Avatar" />
								) : (
									dataProfile.avatar instanceof File && (
										<img src={URL.createObjectURL(dataProfile.avatar)} alt="User Avatar" />
									)
								)}

								{showImage && (
									<div className={`${styles.image} `}>
										<CameraSVG className={styles.cameraSVG} />
									</div>
								)}
							</label>
						</div>
						<AccountInputBox
							styles={styles}
							id="name"
							label="Name"
							value={dataProfile.name ?? ''}
							showPassword={false}
							onChangeInput={onChangeInputProfile}></AccountInputBox>
						<FormBtn
							type="submit"
							className={`${styles.saveChanges} ${enabledButtonProfile ? styles.enabledChanges : ''}`}>
							Save Changes
						</FormBtn>
					</form>
				</ProfileInfoBox>
				<ProfileInfoBox>
					<p className={styles.boxTitle}>Email Address</p>
					<label htmlFor="email" className={styles.profileLabel}>
						<input
							type="text"
							id="email"
							disabled
							value={email ?? ''}
							className={` ${styles.profileEmail} ${styles.profileEmailDisabled}`}
						/>
					</label>
					<button id="email" onClick={e => handleAccountPopup(e)} className={styles.changeEmail}>
						Change Email Address
					</button>
				</ProfileInfoBox>
				<ProfileInfoBox>
					<p className={styles.boxTitle}>Password</p>
					{errorMessage && (
						<APIResponseMessage responseMessage={errorMessage} meesageType="error">
							<WarnSVG className={styles.warnSVG} />
						</APIResponseMessage>
					)}
					{successMessage && (
						<APIResponseMessage responseMessage={successMessage} meesageType="succes"></APIResponseMessage>
					)}
					<form onSubmit={e => handleSubmit(e)} className={styles.formContainer}>
						<AccountInputBox
							styles={styles}
							id="currentPassword"
							label="Current Password"
							value={dataPass.currentPassword}
							showPassword={true}
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
							styles={styles}
							id="newPassword"
							label="New Password"
							value={dataPass.newPassword}
							showPassword={true}
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
							styles={styles}
							id="confirmPassword"
							label="Confirm Password"
							showPassword={true}
							value={dataPass.confirmPassword}
							onChangeInput={onChangeInput}></AccountInputBox>

						<FormBtn
							type="submit"
							isSubmitting={!enabledButton}
							className={`${styles.saveChanges} ${enabledButton ? styles.enabledChanges : ''}`}>
							Save Changes
						</FormBtn>
					</form>
				</ProfileInfoBox>
				<ProfileInfoBox>
					<p className={styles.boxTitle}>Delete Account</p>
					<p>You will lose access to your account once your deletion request has been submitted.</p>

					<AnchorLink href="/account/delete" ariaLabel="Delete account" className={styles.deleteAccount}>
						Delete Account
					</AnchorLink>
				</ProfileInfoBox>
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
