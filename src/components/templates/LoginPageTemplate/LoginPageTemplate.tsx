import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLoginMutation } from '../../../slices/api/loginSlice'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
})

type loginFields = z.infer<typeof loginSchema>

const LoginPageTemplate = () => {
	const [logIn, { isSuccess,error }] = useLoginMutation()
    console.log(error);
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		setError,
		formState: { isSubmitting, errors },
	} = useForm<loginFields>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit: SubmitHandler<loginFields> = async data => {
		try {
            await new Promise(resolve => setTimeout(resolve,2000))
            
            const res = await logIn({...data}).unwrap()
			
            console.log(res);
			if (isSuccess) {
				navigate('/')
			}
		} catch {
			setError('root', { message: 'Fill all fields' })
		}
	}

	return (
		<div>
			<form name="logIn" method="post" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<input {...register('email')} type="email" placeholder="Enter your email" />
				{errors.email && <span>{errors.email.message}</span>}
				<input {...register('password')} type="password" placeholder="Enter your Password" />
				{errors.password && <span>{errors.password.message}</span>}

				<button disabled={isSubmitting} type="submit">
					{isSubmitting ? 'Sending...' : 'LogIn'}
				</button>
			</form>
		</div>
	)
}

export default LoginPageTemplate
