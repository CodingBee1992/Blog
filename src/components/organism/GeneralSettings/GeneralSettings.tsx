import z from "zod"
import APIResponseMessage from "../../atoms/APIResponseMessage/APIResponseMessage"
import FormBtn from "../../atoms/FormBtn/FormBtn"
import styles from './GeneralSettings.module.scss'
import { useEffect, useState } from "react"
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import RHFInput from "../../atoms/RHFInput/RHFInput"
const contactSchema = z.object({
	firstName: z.string().trim().min(1, { message: 'First name is required' }),
	lastName: z.string().trim().min(1, { message: 'Last name is required' }),
	email: z.email(),
	subject: z.string().trim().min(1, { message: 'Subject is required' }),
	message: z.string().trim().min(1, { message: 'Message is required' }),
	policy: z.boolean().refine(val => val === true, {
		message: 'You must accept the Privacy Policy',
	}),
})
type contactTypes = z.infer<typeof contactSchema>
const GeneralSettings = () => {
	const [successMessage, setSuccessMessage] = useState<string>('')
	

	const methods = useForm<contactTypes>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		resolver: zodResolver(contactSchema),
		defaultValues: {
			
		},
	})

	const {
		handleSubmit,
		reset,
		setError,
		formState: { isSubmitting, errors },
	} = methods

	const onSubmit: SubmitHandler<contactTypes> = async data => {
		try {
			if (!data) return

			

			// if (res) {
			// 	setSuccessMessage(res.message)
			// 	reset()
			// }
			setError('root', { message: '' })
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

	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage('')
			}, 5000)

			return () => clearTimeout(timer)
		}
	}, [successMessage])

	return (
		<FormProvider {...methods}>
			<div className={styles.generalContainer}>
				
				<form onSubmit={handleSubmit(onSubmit)} aria-busy={isSubmitting} className={styles.contactForm}>
					
						<RHFInput
							type="text"
							name="firstName"
							id="firstName"
							label="First Name"
							styles={styles}
							isSubmitting={isSubmitting}
							placeholder="Enter your First Name"
						/>
						
					
					
					
					
					{(errors.root?.message || successMessage) && (
						<APIResponseMessage messageType={successMessage ? 'success' : 'error'}>
							{errors.root?.message ? errors.root.message : successMessage}
						</APIResponseMessage>
					)}

					<FormBtn type="submit" isSubmitting={isSubmitting} className={styles.sendMessage}>
						Send
					</FormBtn>
				</form>
			</div>
		</FormProvider>
	)
}


export default GeneralSettings
