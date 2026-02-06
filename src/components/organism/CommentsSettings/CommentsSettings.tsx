import styles from './CommentsSettings.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import { commentsDefaults, commentsSchema, type commentsTypes } from '../../../types/generalSchema'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import WrapperBox from '../../atoms/WrapperBox/WrapperBox'
import SwitchButton from '../../atoms/SwitchButton/SwitchButton'
import RHFCheckbox from '../../atoms/RHFCheckbox/RHFCheckbox'
import APIResponseMessage from '../../atoms/APIResponseMessage/APIResponseMessage'
import FormBtn from '../../atoms/FormBtn/FormBtn'
import { useUpdateCommentsSettingsMutation } from '../../../slices/api/generalSettingsApi'
import useMenuContext from '../../../hooks/useMenuContext'

const CommentsSettings = () => {
	const [successMessage, setSuccessMessage] = useState<string>('')

	const [updateSettings] = useUpdateCommentsSettingsMutation()

	const { comments } = useMenuContext()

	const methods = useForm<commentsTypes>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		resolver: zodResolver(commentsSchema),
		defaultValues: commentsDefaults,
	})

	const {
		control,
		handleSubmit,
		reset,
		setError,
		setValue,
		clearErrors,
		formState: { isSubmitting, errors, isDirty },
	} = methods

	const [commentsEnabled, moderation] = useWatch({
		control,
		name: ['commentsEnabled', 'moderation'],
	})

	const onSubmit: SubmitHandler<commentsTypes> = async data => {
		try {
			if (!data) return
			if (!isDirty) return
			const res = await updateSettings({ comments: data }).unwrap()

			if (res) {
				setSuccessMessage(res.message)
				reset(data)
			}
			if(errors.root?.message) clearErrors('root')
		} catch (error) {
			if (typeof error === 'object' && error !== null) {
				const fetchError = error as FetchBaseQueryError
				const message =
					fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data
						? (fetchError.data.message as string)
						: 'An unexpected error has occured'

				setError('root', { message })
			} else {
				setError('root', { message: 'An unexpected error has occured' })
			}
		}
	}

	const handleResetFields = () => {
		Object.entries(commentsDefaults).forEach(([key, value]) => {
			setValue(key as keyof commentsTypes, value, {
				shouldDirty: true,
			})
		})
	}

	useEffect(() => {
		if (comments) reset(comments)
	}, [comments, reset])

	useEffect(() => {
		if (errors.root?.message) {
			const timer = setTimeout(() => {
				clearErrors('root')
				reset(comments)
			}, 5000)

			return () => clearTimeout(timer)
		}
		if (successMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage('')
			}, 5000)

			return () => clearTimeout(timer)
		}
	}, [clearErrors, comments, errors.root?.message, reset, successMessage])

	return (
		<FormProvider {...methods}>
			<WrapperBox>
				<p className={styles.boxTitle}>Comments Settings</p>
				<form onSubmit={handleSubmit(onSubmit)} aria-busy={isSubmitting} className={styles.formWrapper}>
					<RHFCheckbox
						name="commentsEnabled"
						id="comments"
						label="Comments"
						styles={styles}
						isSubmitting={isSubmitting}>
						<SwitchButton switchButton={commentsEnabled} isSubmitting={isSubmitting} />
					</RHFCheckbox>
					
					<RHFCheckbox
						name="moderation"
						id="moderation"
						label="Comments moderation"
						styles={styles}
						isSubmitting={isSubmitting}>
						<SwitchButton switchButton={moderation} isSubmitting={isSubmitting} />
					</RHFCheckbox>

					{(errors.root?.message || successMessage) && (
						<APIResponseMessage messageType={successMessage ? 'success' : 'error'}>
							{errors.root?.message ? errors.root.message : successMessage}
						</APIResponseMessage>
					)}
					<div className={styles.submitBtns}>
						<FormBtn type="submit" isSubmitting={isSubmitting} className={isDirty ? styles.saveSettings : ''}>
							{isSubmitting ? (
								<>
									Saving
									<span className={styles.animate1}>.</span>
									<span className={styles.animate2}>.</span>
									<span className={styles.animate3}>.</span>
								</>
							) : (
								'Save'
							)}
						</FormBtn>

						<FormBtn
							type="button"
							isSubmitting={isSubmitting}
							className={styles.clearButton}
							handleResetFields={handleResetFields}>
							Clear
						</FormBtn>
					</div>
				</form>
			</WrapperBox>
		</FormProvider>
	)
}

export default CommentsSettings
