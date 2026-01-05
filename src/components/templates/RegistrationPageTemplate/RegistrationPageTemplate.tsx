import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useCreateAccountMutation } from '../../../slices/api/userApi'
import z from 'zod'
import styles from './RegistrationPageTemplate.module.scss'
import { useEffect, useState } from 'react'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const registrationSchema = z.object({
	name: z.string().trim().min(4),
	email: z.email().trim(),
	password: z.string().trim().min(8),
})

type registrationFields = z.infer<typeof registrationSchema>
const RegistrationPageTemplate = () => {
	const [createAccount, { isSuccess, data }] = useCreateAccountMutation()

	const [success, setSuccess] = useState<boolean>(false)

	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { isSubmitting, errors },
	} = useForm<registrationFields>({
		resolver: zodResolver(registrationSchema),
	})
	useEffect(() => {
		if (isSuccess) {
			setSuccess(true)
			const timer = setTimeout(() => {
				navigate('/')
			}, 1000)

			return () => clearTimeout(timer)
		}
	}, [isSuccess, navigate])
	const onSubmit: SubmitHandler<registrationFields> = async data => {
		try {
			await new Promise(resolve => setTimeout(resolve, 2000))

			await createAccount({ ...data }).unwrap()

			clearErrors()
		} catch (error) {
			if (typeof error === 'object' && error !== null) {
				const fetchError = error as FetchBaseQueryError
				const messageError =
					fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data
						? (fetchError.data.message as string)
						: 'An unexpected error has occurred'
				setError('root', { message: messageError })
			} else {
				setError('root', { message: 'An unexpected error has occurred' })
			}
		}
	}

	return (
		<div className={styles.logInContainer}>
			<div className={styles.loginWrapper}>
				<div className={styles.greetingText}>
					<a href="/" className={styles.logo}>
						codingBee
					</a>
				</div>
				<div className={styles.formContainer}>
					<h1>Create an account</h1>
					<p>
						Already have an account ? <AnchorLink href="/login">Sign In</AnchorLink>
					</p>
					<form
						name="createAccountForm"
						method="post"
						autoComplete="off"
						onSubmit={handleSubmit(onSubmit)}
						className={styles.form}>
						<input {...register('name')} type="text" placeholder="Enter your name" />
						{errors.name && <span>{errors.name.message}</span>}
						<input {...register('email')} type="email" placeholder="Enter your email" />
						{errors.email && <span>{errors.email.message}</span>}
						<input {...register('password')} type="password" placeholder="Enter your Password" />
						{errors.password && <span>{errors.password.message}</span>}
						{errors.root && <span>{errors.root.message}</span>}

						{success && <span className={styles.success}>{data?.message}</span>}
						<button disabled={isSubmitting} type="submit" className={styles.signInButton}>
							{isSubmitting ? 'Creating...' : 'Create account'}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default RegistrationPageTemplate
