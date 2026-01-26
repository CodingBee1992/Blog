import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import styles from './AddCategoryForm.module.scss'
import RHFInput from '../../atoms/RHFInput/RHFInput'
import FormBtn from '../../atoms/FormBtn/FormBtn'
import { useCreateCategoryMutation } from '../../../slices/api/categoriesApi'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useEffect, useState } from 'react'
const categorySchema = z.object({
	name: z.string().trim().min(4, { message: 'Min 4 characters' }),
	slug: z.string().trim().min(4, { message: 'Min 4 characters' }),
})

type schemaTypes = z.infer<typeof categorySchema>

const AddCategoryForm = () => {
	const [successMessage, setSuccessMessage] = useState<string>('')
	const [addCategory] = useCreateCategoryMutation()

	const methods = useForm<schemaTypes>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: '',
			slug: '',
		},
	})

	const {
		control,
		handleSubmit,
		reset,
		setError,
		
		
		formState: { isSubmitting, errors },
	} = methods

	const watch = useWatch({control,name:'name'})
	const onSubmit: SubmitHandler<schemaTypes> = async (data: schemaTypes) => {
		try {
			const { name, slug } = data
			const res = await addCategory({ name, slug }).unwrap()

			console.log(res)
			if (res) setSuccessMessage(res.message)

			reset()
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
		if(watch){
			setSuccessMessage('')
		}
		if (successMessage) {
			setTimeout(() => {
				setSuccessMessage('')
			}, 10000)
		}
	}, [successMessage, watch])
	useEffect(() => {
		setError('root', { message: '' })
		
	}, [watch, setError])

	const handleResetFields = () => {
		reset()
	}
	return (
		<FormProvider {...methods}>
			<div className={styles.addCategoryContainer}>
				<p>Add Category</p>

				<form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
					<div className={styles.formWrapper}>
						<RHFInput name="name" type='text' styles={styles} label="Category Name" id="name" />
						<RHFInput name="slug" type='text' styles={styles} label="Category Slug" id="slug" />
					</div>
					{successMessage && <span className={styles.successMessage}>{successMessage}</span>}
					{errors.root && <span className={styles.errorMessage}>{errors.root.message}</span>}
					<div className={styles.submitBtns}>
						<FormBtn type="submit" isSubmitting={isSubmitting} className={styles.submitBtn}>
							{isSubmitting ? (
								<>
									Creating
									<span className={styles.animate1}>.</span>
									<span className={styles.animate2}>.</span>
									<span className={styles.animate3}>.</span>
								</>
							) : (
								'Create'
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
			</div>
		</FormProvider>
	)
}

export default AddCategoryForm
