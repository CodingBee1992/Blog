import { useDispatch } from 'react-redux'
import { useFetchCloudinaryMutation } from '../../../slices/api/cloudinaryApi'
import { useUpdateProfileMutation } from '../../../slices/api/userApi'
import WrapperBox from '../../atoms/WrapperBox/WrapperBox'
import styles from './Profile.module.scss'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import APIResponseMessage from '../../atoms/APIResponseMessage/APIResponseMessage'
import { CameraSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
// import AccountInputBox from '../../modules/AccountInputBox/AccountInputBox'
import FormBtn from '../../atoms/FormBtn/FormBtn'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { setData } from '../../../slices/authSlice'
import uploadToCloudinary from '../../../hooks/useUploadToCloudinary'

import z from 'zod'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import RHFInput from '../../atoms/RHFInput/RHFInput'
// type ProfileData = {
// 	name: string
// 	avatar: string | File | null
// }

const profileSchema = z.object({
	name: z.string().trim().min(1, { message: 'Field is required' }),
	avatar: z
		.instanceof(File)
		.or(z.string())
		.nullable()
		.refine(v => v !== null, { message: 'Please upload a file' }),
})
type profileTypes = z.infer<typeof profileSchema>

const Profile = () => {
	const uploadFolder = import.meta.env.VITE_UPLOAD_AVATARS
	const [updateProfile] = useUpdateProfileMutation()
	const [createSignature] = useFetchCloudinaryMutation()
	const dispatch = useDispatch()
	const [showImage, setShowImage] = useState<boolean>(false)
	const [enabledButtonProfile, setEnabledButtonProfile] = useState<boolean>(false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [profileErrorMessage, setProfileErrorMessage] = useState<string>('')
	const [profileSuccessMessage, setProfileSuccessMessage] = useState<string>('')

	
	

	// const [dataProfile, setDataProfile] = useState<ProfileData>({
	// 	name: name ?? '',
	// 	avatar: avatar?.src ?? '',
	// })
	// useEffect(() => {
	// 	if (profileData) {
	// 		setDataProfile({
	// 			name: profileData.name ?? '',
	// 			avatar: profileData.avatar?.src ?? '',
	// 		})
	// 	}
	// }, [profileData])

	const methods = useForm<profileTypes>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: profileData.name ?? '',
			avatar: profileData.avatar.src ?? File,
		},
	})
	const {
		handleSubmit,
		register,
		// setError,
		setValue,
		getValues,
		formState: { isSubmitting },
	} = methods
	// const handleProfileSubmit = async (e: FormEvent) => {
	// 	e.preventDefault()

	// 	let updatedAvatar = {}
	// 	try {
	//         if (dataProfile.avatar instanceof File) {
	//             const file = dataProfile.avatar
	// 			const dataSignature = await createSignature({ uploadFolder }).unwrap()

	// 			const data = await uploadToCloudinary({
	// 				file,
	// 				uploadFolder,
	// 				dataSignature,
	// 			})
	// 			updatedAvatar = { src: data.secure_url, public_id: data.public_id }
	// 		} else {
	// 			updatedAvatar = avatar
	// 		}

	// 		const res = await updateProfile({ name: dataProfile.name, updatedAvatar }).unwrap()

	// 		if (res) setProfileSuccessMessage(res.message)

	// 		dispatch(setData(res))
	// 		setEnabledButtonProfile(false)
	// 	} catch (error) {
	// 		if (typeof error === 'object' && error !== null) {
	// 			const fetchError = error as FetchBaseQueryError
	// 			const message =
	// 				fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data
	// 					? (fetchError.data.message as string)
	// 					: 'An unexpected error has occured'

	// 			setProfileErrorMessage(message)
	// 			setProfileSuccessMessage('')
	// 		} else {
	// 			setProfileErrorMessage('An unexpected error has occured')
	// 		}
	// 	}
	// }
	const onChangeInputProfile = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget

		const { name, type } = target

		if (type === 'file') {
			const file = target.files?.[0]
			if (!file) return

			const maxSizeMB = 3
			if (file.size / 1024 / 1024 > maxSizeMB) {
				setProfileErrorMessage(`Plik musi być mniejszy niż ${maxSizeMB} MB`)
				// setDataProfile(data => ({ ...data, avatar: profileData.avatar?.src }))
				setValue('avatar', profileData.avatar?.src)
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
					setValue('avatar', profileData.avatar?.src)
					// setDataProfile(data => ({ ...data, avatar: profileData.avatar?.src }))
					if (fileInputRef.current) fileInputRef.current.value = ''
					return
				}
				if (width > 256 || height > 256) {
					setProfileErrorMessage('Obraz jest za duży! Maksimum 256x256 px')
					setValue('avatar', profileData.avatar?.src)
					// setDataProfile(data => ({ ...data, avatar: profileData.avatar?.src }))
					if (fileInputRef.current) fileInputRef.current.value = ''
					return
				}
			}
			setValue('avatar', file, { shouldValidate: true })
			// setDataProfile(data => ({ ...data, [name]: file }))
		} else {
			// setDataProfile(data => ({ ...data, [name]: value }))
		}

		if (name.length > 1) {
			setEnabledButtonProfile(true)
		} else {
			setEnabledButtonProfile(false)
		}
	}
	const onSubmit: SubmitHandler<profileTypes> = async data => {
		console.log(data)
		let updatedAvatar = {}
		try {
			if (data.avatar instanceof File) {
				const file = data.avatar
				const dataSignature = await createSignature({ uploadFolder }).unwrap()

				const uploadFile = await uploadToCloudinary({
					file,
					uploadFolder,
					dataSignature,
				})
				updatedAvatar = { src: uploadFile.secure_url, public_id: uploadFile.public_id }
			} else {
				updatedAvatar = avatar
			}

			const res = await updateProfile({ name: data.name, updatedAvatar }).unwrap()

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
	useEffect(() => {
		if (isSubmitting) {
			setEnabledButtonProfile(true)
		} else {
			setEnabledButtonProfile(false)
		}
	}, [isSubmitting])

	useEffect(() => {
		if (profileSuccessMessage) {
			const timer = setTimeout(() => {
				setProfileSuccessMessage('')
			}, 3000)

			return () => clearTimeout(timer)
		}

		if (profileErrorMessage) {
			const timer = setTimeout(() => {
				setProfileErrorMessage('')
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [profileErrorMessage, profileSuccessMessage])

	return (
		<FormProvider {...methods}>
			<WrapperBox>
				<p className={styles.boxTitle}>Profile</p>

				<form
					aria-busy={isSubmitting}
					onSubmit={handleSubmit(onSubmit)}
					className={`${styles.formWrapper} ${
						profileSuccessMessage || profileErrorMessage ? '' : styles.profileContainer
					}`}>
					<div className={styles.profileBox}>
						{(profileSuccessMessage || profileErrorMessage) && (
							<APIResponseMessage messageType={profileSuccessMessage ? 'succes' : 'error'}>
								{profileSuccessMessage ? profileSuccessMessage : <>{profileErrorMessage}</>}
							</APIResponseMessage>
						)}
						<label
							htmlFor="avatar"
							className={styles.avatarBox}
							onMouseEnter={() => setShowImage(true)}
							onMouseLeave={() => setShowImage(false)}>
							<input
								// ref={fileInputRef}
								type="file"
								// name="avatar"
								id="avatar"
								disabled={isSubmitting}
								aria-readonly={isSubmitting}
								// onChange={e => onChangeInputProfile(e)}
								{...register('avatar', {
									onChange: e => {
										onChangeInputProfile(e)
									},
								})}
							/>

							{typeof getValues('avatar') === 'string' ? (
								<img src={getValues('avatar')!} alt="User Avatar" />
							) : (
								getValues('avatar') instanceof File && (
									<img src={URL.createObjectURL(getValues('avatar')!)} alt="User Avatar" />
								)
							)}

							{showImage && (
								<div className={`${styles.image} `}>
									<CameraSVG className={styles.cameraSVG} />
								</div>
							)}
						</label>
					</div>
					{/* <AccountInputBox
					id="name"
					label="Name"
					value={dataProfile.name ?? ''}
					type="text"
					isSubmitting={isSubmitting}
					onChangeInput={onChangeInputProfile}></AccountInputBox> */}
					<RHFInput name="name" id="name" label="Name" type="text" styles={styles} />
					<FormBtn
						type="submit"
						isSubmitting={isSubmitting}
						className={`${styles.saveChanges} ${enabledButtonProfile ? styles.enabledChanges : ''}`}>
						Save Changes
					</FormBtn>
				</form>
			</WrapperBox>
		</FormProvider>
	)
}

export default Profile
