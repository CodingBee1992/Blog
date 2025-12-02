import { FormProvider, useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema, defaultValues, type postSchemaTypes } from '../../../types/formSchema'
import RHFInput from '../../atoms/RHFInput/RHFInput'
import RHFTextArea from '../../atoms/RHFTextArea/RHFTextArea'
import RHFAddFile from '../../atoms/RHFAddFile/RHFAddFile'
import RHFCategorySelect from '../../atoms/RHFCategorySelect/RHFCategorySelect'
import RHFSelect from '../../atoms/RHFSelect/RHFSelect'
import { useCreatePostMutation, useFetchCloudinaryQuery } from '../../../slices/api/apiSlice'
import styles from './PostForm.module.scss'
import uploadToCloudinary from '../../../hooks/useUploadToCloudinary'
import { useRef } from 'react'
import { allCategories } from '../../../utils/data'


const statusOptions = ['draft', 'published']

const PostForm = () => {
	const uploadFolder = import.meta.env.VITE_UPLOAD_PRESET
	const buttons = ['title', 'text', 'image'] as const
	const fileRef = useRef<(HTMLInputElement | null)[]>([])
	const [createPost] = useCreatePostMutation()
	const { data:dataSignature} = useFetchCloudinaryQuery({})
	
	const methods = useForm<postSchemaTypes>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		resolver: zodResolver(postSchema),
		defaultValues,
	})
	const {
		handleSubmit,
		setError,
		control,
		reset,
		formState: { isSubmitting },
	} = methods
	const { fields: articleContent, append } = useFieldArray({ control, name: 'articleContent' })

	const handleResetFields = () => {
		if (fileRef.current) fileRef.current.forEach(el => el && (el.value = ''))
		reset()
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
	const onSumbit: SubmitHandler<postSchemaTypes> = async (data: postSchemaTypes) => {
		try {
			await new Promise(resolve => setTimeout(resolve, 1000))
			
			let mainImage = data.mainImage

			if (mainImage.src instanceof File) {
				const data = await uploadToCloudinary({file:mainImage.src,uploadFolder,dataSignature})
				console.log(data)
				mainImage = { ...mainImage, src: data.secure_url }
			}

			const articleContent = await Promise.all(
				data.articleContent.map(async (item) => {
					
					if (item.type === 'image' && item.value.src instanceof File) {
						const file = item.value.src

						const data = await uploadToCloudinary({file,uploadFolder,dataSignature})

						return { ...item, value: { ...item.value, src: data.secure_url } }
					}
					return item
				})
			)

			const updatedData = { ...data, articleContent, mainImage }

			await createPost({ updatedData }).unwrap()

			reset()
		} catch (error) {
			console.log(error)
			setError('root', { message: 'Please fill all fields' })
		}
	}

	return (
		<FormProvider {...methods}>
			<div className={styles.postFormContainer}>
				<div className={styles.postFormControllersWrapper}>
					<div className={styles.postFormControllers}>
						{buttons.map((btn, index) => (
							<button
								className={styles.postFormBtns}
								key={index}
								onClick={() => {
									if (btn === 'image') {
										append({ type: btn, value: { src: null, alt: '', caption: '',public_id:'' } })
									} else {
										append({ type: btn, value: '' })
									}
								}}>
								+ {btn}
							</button>
						))}
					</div>
				</div>

				<form onSubmit={handleSubmit(onSumbit)} className={styles.formContainer}>
					<div className={styles.formWrapper}>
						<div className={styles.formFlex}>
							<RHFInput<postSchemaTypes> name="title" label="Main Title" styles={styles} id={`title-title`} />
							<RHFTextArea<postSchemaTypes>
								name="introduction"
								label="Introduction"
								styles={styles}
								id={`text-Intro`}
							/>

							<RHFAddFile<postSchemaTypes>
								name="mainImage"
								label="Main Image"
								styles={styles}
								fileRef={fileRef}
								fileIndex={-1}
							/>

							{articleContent &&
								articleContent?.length > 0 &&
								articleContent.map((field, index) => (
									<div key={index}>
										{field.type === 'title' && (
											<RHFInput<postSchemaTypes>
												id={`title-${index}`}
												name={`articleContent.${index}.value`}
												label="Subtitle"
												styles={styles}
											/>
										)}
										{field.type === 'text' && (
											<RHFTextArea<postSchemaTypes>
												name={`articleContent.${index}.value`}
												label="Text"
												styles={styles}
												id={`text-${index}`}
											/>
										)}
										{field.type === 'image' && (
											<RHFAddFile<postSchemaTypes>
												name={`articleContent.${index}.value`}
												label="Content Image"
												styles={styles}
												fileRef={fileRef}
												fileIndex={index}
											/>
										)}
									</div>
								))}
							{articleContent &&
								articleContent.map((field, index) => (
									<div key={index}>
										{field.type === 'completion' && (
											<RHFTextArea
												name={`articleContent.${index}.value`}
												label="Completion"
												styles={styles}
												id={`text-${index}`}
											/>
										)}

										{field.type === 'callToAction' && (
											<RHFTextArea
												name={`articleContent.${index}.value`}
												label="Call to action"
												styles={styles}
												id={`text-${index}`}
											/>
										)}
									</div>
								))}
						</div>
						<div className={styles.formOptionsContainer}>
							<div className={styles.formOptionsWrapper}>
								<RHFCategorySelect<postSchemaTypes>
									name="categories"
									options={allCategories}
									label="Categories"
									max={3}
									styles={styles}
								/>

								<div className={styles.seoContainer}>
									<p className={styles.seoTitle}>SEO</p>

									<RHFInput name="seo.slug" label="Slug" styles={styles} id={`title-slug`} />

									<RHFInput name="seo.metaTitle" label="Meta Title" styles={styles} id={`title-metaTitle`} />

									<RHFInput name="seo.metaDescription" label="Meta Description" styles={styles} id={`title-metaDesc`} />
								</div>
								<RHFSelect name="status" label="Status" options={statusOptions} styles={styles} />
							</div>
						</div>
					</div>
					<div className={styles.submitBtns}>
						<button disabled={isSubmitting} type="submit" className={`${styles.submitBtn} ${styles.postFormBtn}`}>
							{isSubmitting ? 'Creating' : 'Create Post'}
						</button>
						<button
							disabled={isSubmitting}
							type="button"
							onClick={() => handleResetFields()}
							className={`${styles.resetBtn} ${styles.postFormBtn} `}>
							Reset
						</button>
					</div>
				</form>
			</div>
		</FormProvider>
	)
}

export default PostForm
