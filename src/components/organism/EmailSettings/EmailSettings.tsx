import { FormProvider, useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import styles from './EmailSettings.module.scss'
import RHFInput from '../../atoms/RHFInput/RHFInput'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import RHFSelect from '../../atoms/RHFSelect/RHFSelect'
import { useEffect, useState } from 'react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import FormBtn from '../../atoms/FormBtn/FormBtn'
import { useCreateSMTPMutation, useTestSMTPMutation } from '../../../slices/api/emailApi'
import APIResponseMessage from '../../atoms/APIResponseMessage/APIResponseMessage'

import WrapperBox from '../../atoms/WrapperBox/WrapperBox'

const smtpSchema = z.object({
	provider: z.string().trim().min(1, { message: 'SMTP provider is required' }),

	host: z.string().trim().min(1, { message: 'Host is required' }),

	port: z
		.number({
			message: 'Port is required',
		})
		.int('Port must be an integer')
		.min(1, 'Port must be greater than 0')
		.max(65535, 'Port must be less than 65536'),

	secure: z.boolean({
		message: 'Secure connection type is required',
	}),

	user: z.email('User must be a valid email'),

	password: z.string().trim().min(1, { message: 'Password is required' }),

	fromName: z.string().trim().min(1, { message: 'From name is required' }),
	fromEmail: z.string().trim().min(1, { message: 'From email is required' }),
	replyTo: z.string().trim().min(1, { message: 'Reply to is required' }),
})
type smtpTypes = z.infer<typeof smtpSchema>
const EmailSettings = () => {
	const options = ['true', 'false']
	const [email, setEmail] = useState<string>('')
	const [successMessage, setSuccessMessage] = useState<string>('')
	const [testMessage, setTestMessage] = useState<string>('')
	const [errorTestMessage, setErrorTestMessage] = useState<string>('')

	const [createSMTP] = useCreateSMTPMutation()
	const [testSMTP, { isLoading }] = useTestSMTPMutation()
	const methods = useForm<smtpTypes>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		resolver: zodResolver(smtpSchema),
		defaultValues: {
			provider: '',
			host: '',
			port: 0,
			secure: false,
			user: '',
			password: '',
			fromName: '',
			fromEmail: '',
			replyTo: '',
		},
	})

	const {
		control,
		handleSubmit,
		reset,
		setError,
		formState: { isSubmitting, errors },
	} = methods
	const watch = useWatch({ control, name: 'provider' })

	const onSubmit: SubmitHandler<smtpTypes> = async data => {
		try {
			if (!data) return
			const res = await createSMTP(data).unwrap()

			setSuccessMessage(res.message)
			reset()
		} catch (error) {
			if (typeof error === 'object' && error !== null) {
				const fetchError = error as FetchBaseQueryError
				const message =
					fetchError.data && typeof fetchError.data === 'object' && 'error' in fetchError.data
						? (fetchError.data.error as string)
						: 'An unexpected error has occured'

				setError('root', { message })
			} else {
				setError('root', { message: 'An unexpected error has occured' })
			}
		}
	}

	useEffect(() => {
		if (watch) {
			setSuccessMessage('')
		}
		if (successMessage) {
			setTimeout(() => {
				setSuccessMessage('')
			}, 5000)
		}
	}, [successMessage, watch])
	useEffect(() => {
		setError('root', { message: '' })
	}, [watch, setError])
	const handleResetFields = () => {
		reset()
	}
	const handleTestSMTP = async () => {
		try {
			const res = await testSMTP(email).unwrap()
			if (res) setTestMessage(res.message)
		} catch (error) {
			if (typeof error === 'object' && error !== null) {
				const fetchError = error as FetchBaseQueryError
				const message =
					fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data
						? (fetchError.data.message as string)
						: 'An unexpected error has occured'

				setErrorTestMessage(message)
			} else {
				setErrorTestMessage('An unexpected error has occured')
			}
		}
	}
	useEffect(() => {
		if (testMessage) {
			const timer = setTimeout(() => {
				setTestMessage('')
			}, 5000)

			return () => clearTimeout(timer)
		}
		if (errorTestMessage) {
			const timer = setTimeout(() => {
				setErrorTestMessage('')
			}, 5000)

			return () => clearTimeout(timer)
		}
	}, [errorTestMessage, testMessage])
	return (
		<div className={styles.emailSettingsContainer}>
			<h3 className={styles.title}>Email Settings</h3>
			<WrapperBox>
				<div className={styles.smtpWrapper}>
					<h3 className={styles.subtitle}>SMTP</h3>

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer} aria-busy={isSubmitting}>
							<div className={styles.formWrapper}>
								<RHFInput
									styles={styles}
									type="text"
									name="provider"
									label="Provider"
									id="provider"
									placeholder="ex. Gmail"
									isSubmitting={isSubmitting}
								/>
								<RHFInput styles={styles} type="text" name="host" label="Host" id="post" isSubmitting={isSubmitting} />
								<RHFInput
									styles={styles}
									type="number"
									name="port"
									label="Port"
									id="port"
									isSubmitting={isSubmitting}
								/>
								<RHFSelect name="secure" label="Secure" options={options} styles={styles} isSubmitting={isSubmitting} />
								<RHFInput styles={styles} type="text" name="user" label="User" id="user" isSubmitting={isSubmitting} />
								<RHFInput
									styles={styles}
									type="password"
									name="password"
									label="Password"
									id="password"
									isSubmitting={isSubmitting}
								/>

								<h3 className={styles.subtitle}>Email sending settings </h3>
								<RHFInput
									styles={styles}
									type="text"
									name="fromName"
									label="Company Name"
									id="fromName"
									isSubmitting={isSubmitting}
								/>
								<RHFInput
									styles={styles}
									type="text"
									name="fromEmail"
									label="Company Email"
									id="fromEmail"
									isSubmitting={isSubmitting}
								/>
								<RHFInput
									styles={styles}
									type="text"
									name="replyTo"
									label="Reply to"
									id="replyTo"
									isSubmitting={isSubmitting}
								/>
							</div>
							{successMessage && <span className={styles.successMessage}>{successMessage}</span>}
							{errors.root && <span className={styles.errorMessage}>{errors.root.message}</span>}

							<div className={styles.submitBtns}>
								<FormBtn type="submit" isSubmitting={isSubmitting} className={styles.submitBtn}>
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
									className={styles.resetBtn}
									handleResetFields={handleResetFields}>
									Reset
								</FormBtn>
							</div>
						</form>
					</FormProvider>
				</div>
			</WrapperBox>
			<WrapperBox>
				<div className={styles.testWrapper}>
					<label htmlFor="email" className={styles.subtitle}>
						Email Test
					</label>

					<input
						type="email"
						name="Email"
						id="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						className={styles.testEmail}
						placeholder="example@example.com"
						readOnly={isLoading}
						aria-readonly={isLoading}
					/>

					{(testMessage || errorTestMessage) && (
						<APIResponseMessage className={styles.testMessage} messageType={testMessage ? 'succes' : 'error'}>
							{testMessage ? testMessage : <>{errorTestMessage}</>}
						</APIResponseMessage>
					)}
					<FormBtn
						type="button"
						isSubmitting={isLoading}
						className={styles.testBtn}
						handleResetFields={() => handleTestSMTP()}>
						Test
					</FormBtn>
				</div>
			</WrapperBox>
		</div>
	)
}

export default EmailSettings
