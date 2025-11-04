import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useCreateAccountMutation } from '../../../slices/api/loginSlice'
import z from 'zod'
import styles from './RegistrationPageTemplate.module.scss'
import { useEffect, useState } from 'react'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'


const registrationSchema = z.object({
	name: z.string().min(4),
	email: z.email(),
	password: z.string().min(8),
})

type registrationFields = z.infer<typeof registrationSchema>
const RegistrationPageTemplate = () => {
	const [createAccount, { error, isSuccess, data }] = useCreateAccountMutation()
	
	const [success, setSuccess] = useState<boolean>(false)
	console.log(data)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		setError,

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
		} catch {
			if (error) {
				setError('root', { message: `${error?.data.message}` })
			}
		}
	}
	
	return (
		<div className={styles.logInContainer}>
			<div className={styles.loginWrapper}>
				<div className={styles.greetingText}>
					<p className={styles.logo}>codingBee</p>
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

						{success && <span className={styles.success}>Account Created</span>}
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
