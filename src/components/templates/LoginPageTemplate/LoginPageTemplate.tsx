import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLoginMutation } from '../../../slices/api/loginSlice'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import styles from './LoginPageTemplate.module.scss'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setData, setLogin } from '../../../slices/api/authSlice'
const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
})

type loginFields = z.infer<typeof loginSchema>

const LoginPageTemplate = () => {
	const [logIn, { isSuccess }] = useLoginMutation()
	const dispatch = useDispatch()

	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		setError,
		formState: { isSubmitting, errors },
	} = useForm<loginFields>({
		resolver: zodResolver(loginSchema),
	})
	useEffect(() => {
		if (isSuccess) {
			navigate('/')
		}
	}, [isSuccess, navigate])
	const onSubmit: SubmitHandler<loginFields> = async data => {
		try {
			await new Promise(resolve => setTimeout(resolve, 2000))

			const res = await logIn({ ...data }).unwrap()
			console.log(res);
			dispatch(setLogin(true))
			dispatch(setData(res))
		} catch {
			setError('root', { message: 'Fill all fields' })
		}
	}

	return (
		<div className={styles.logInContainer}>
			<div className={styles.loginWrapper}>
				<div className={styles.greetingText}>
					<p className={styles.logo}>codingBee</p>
				</div>
				<div className={styles.formContainer}>
					<h1>Sign In</h1>
					<p>
						Dont have an account ? <a href="/registration">Sign Up</a>
					</p>
					<form
						name="logInForm"
						method="post"
						autoComplete="off"
						onSubmit={handleSubmit(onSubmit)}
						className={styles.form}>
						<input {...register('email')} type="email" placeholder="Enter your email" />
						{errors.email && <span>{errors.email.message}</span>}
						<input {...register('password')} type="password" placeholder="Enter your Password" />
						{errors.password && <span>{errors.password.message}</span>}

						<button disabled={isSubmitting} type="submit" className={styles.signInButton}>
							{isSubmitting ? 'SigIn...' : 'SigIn'}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default LoginPageTemplate
