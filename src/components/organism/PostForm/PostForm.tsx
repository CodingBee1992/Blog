import { useRef, useState, type MouseEvent } from 'react'
import { FormProvider, useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema, defaultValues, type postSchemaTypes } from '../../../types/formSchema'
import RHFInput from '../../atoms/RHFInput/RHFInput'
import RHFTextArea from '../../atoms/RHFTextArea/RHFTextArea'
import RHFAddFile from '../../atoms/RHFAddFile/RHFAddFile'
import RHFCategorySelect from '../../atoms/RHFCategorySelect/RHFCategorySelect'
import RHFSelect from '../../atoms/RHFSelect/RHFSelect'
import {
	useCreatePostMutation,
	useDestroyCloudinaryImageMutation,
	useFetchCloudinaryMutation,
	useUpdatePostMutation,
} from '../../../slices/api/postApi'
import styles from './PostForm.module.scss'
import uploadToCloudinary from '../../../hooks/useUploadToCloudinary'
import { defaultCategories, statusOptions } from '../../../utils/data'
import CloseSvg from '../../../assets/icons/nav/CloseSvg'
import FormBtn from '../../atoms/FormBtn/FormBtn'
import { useFetchAllCategoriesQuery } from '../../../slices/api/categoriesApi'

interface PostFormProps {
	editValues?: postSchemaTypes
	postId?: string | null
}



const PostForm = ({ editValues, postId }: PostFormProps) => {
	const uploadFolder = import.meta.env.VITE_UPLOAD_PRESET
	const buttons = ['title', 'text', 'image'] as const
	const fileRef = useRef<(HTMLInputElement | null)[]>([])
	const [imagesToDestroy, setImagesToDestroy] = useState<string[]>([])
	const [oldDefaultValues, setOldDefaultValues] = useState({})
	const [createPost] = useCreatePostMutation()
	const [createSignature] = useFetchCloudinaryMutation()
	const [updatePost] = useUpdatePostMutation()
	const [destroyCloudinaryImage] = useDestroyCloudinaryImageMutation()
	const {data} = useFetchAllCategoriesQuery()
	

	const allCategories = data && data?.length > 0 ? data : defaultCategories

	const methods = useForm<postSchemaTypes>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		resolver: zodResolver(postSchema),
		defaultValues: editValues ? editValues : defaultValues,
	})
	const {
		handleSubmit,
		setError,
		control,
		reset,
		getValues,
		formState: { isSubmitting, isSubmitSuccessful },
	} = methods
	const { fields: articleContent, insert, remove } = useFieldArray({ control, name: 'articleContent' })

	const handleResetFields = () => {
		if (oldDefaultValues) {
			
			reset(oldDefaultValues)
			setOldDefaultValues({})
		} else {
			if (fileRef.current) fileRef.current.forEach(el => el && (el.value = ''))
			reset()
		}

		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleClearFields = () => {
		if (fileRef.current) fileRef.current.forEach(el => el && (el.value = ''))
		setOldDefaultValues(getValues())
		reset(defaultValues)

		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleDeleteField = (e: MouseEvent<HTMLDivElement>, index: number) => {
		const target = e.currentTarget as HTMLDivElement
		const fieldIndex = +target.dataset.index!

		if (articleContent[index].type === 'image') {
			const imageToDestroy = articleContent[index].value.public_id

			if (imageToDestroy) setImagesToDestroy(prev => [...prev, imageToDestroy])
		}

		remove(fieldIndex)
	}
	
	const onSumbit: SubmitHandler<postSchemaTypes> = async (data: postSchemaTypes) => {
		try {
			if (!editValues) {
				const dataSignature = await createSignature({ uploadFolder }).unwrap()
				let mainImage = data.mainImage

				if (mainImage.src instanceof File) {
					const data = await uploadToCloudinary({ file: mainImage.src, uploadFolder, dataSignature })

					mainImage = { ...mainImage, src: data.secure_url, public_id: data.public_id }
					
				}
				const articleContent = await Promise.all(
					data.articleContent.map(async item => {
						if (item.type === 'image' && item.value.src instanceof File) {
							const file = item.value.src

							const data = await uploadToCloudinary({ file, uploadFolder, dataSignature })

							return { ...item, value: { ...item.value, src: data.secure_url, public_id: data.public_id } }
						}
						return item
					})
				)

				const updatedData = { ...data, articleContent, mainImage }

				await createPost({ updatedData }).unwrap()

				reset()
			} else {
				// Updating Post
				let mainImage = data.mainImage
				if (mainImage.src instanceof File) {
					const file = mainImage.src
					const publicId = mainImage.public_id

					// Create cloudinary signature
					const dataSignature = await createSignature({ publicId }).unwrap()
					// Update new cloudinary image
					const data = await uploadToCloudinary({
						file,
						publicId,
						dataSignature,
					})

					mainImage = { ...mainImage, src: data.secure_url, public_id: data.public_id }
				}

				const articleContent = await Promise.all(
					data.articleContent.map(async item => {
						if (item.type === 'image' && item.value.src instanceof File) {
							const file = item.value.src
							const publicId = item.value.public_id
							let dataSignature
							let data
							if (publicId) {
								// Create cloudinary signature
								dataSignature = await createSignature({ publicId }).unwrap()
								// Update new cloudinary image
								data = await uploadToCloudinary({ file, publicId, dataSignature })
							} else {
								// Create cloudinary signature
								dataSignature = await createSignature({ uploadFolder }).unwrap()
								// Uploading an another image
								data = await uploadToCloudinary({ file, publicId, uploadFolder, dataSignature })
							}

							return { ...item, value: { ...item.value, src: data.secure_url, public_id: data.public_id } }
						}
						return item
					})
				)
				if (imagesToDestroy.length > 0) {
					imagesToDestroy.forEach(item => {
						destroyCloudinaryImage(item).unwrap()
					})
				}

				const updatedData = { ...data, mainImage, articleContent }

				await updatePost({ postId, updatedData }).unwrap()

				reset(defaultValues)
			}
		} catch (error) {
			console.log(error)
			setError('root', { message: 'Please fill all fields' })
		}
	}
	if (isSubmitSuccessful) window.scrollTo({ top: 0, behavior: 'smooth' })
	if (editValues && isSubmitSuccessful)
		return (
			<div className={styles.updateContainer}>
				<div className={styles.updateWrapper}>
					<p>Post Updated Successfully</p>
				</div>
			</div>
		)
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
										insert(articleContent.length - 2, {
											type: btn,
											value: { src: null, alt: '', caption: '', public_id: '' },
										})
									} else {
										insert(articleContent.length - 2, { type: btn, value: '' })
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
									<div key={field.id}>
										{field.type === 'title' && (
											<>
												<RHFInput<postSchemaTypes>
													id={`title-${index}`}
													name={`articleContent.${index}.value`}
													label="Subtitle"
													styles={styles}
												/>
												{index >= 3 && (
													<div
														data-index={index}
														onClick={e => handleDeleteField(e, index)}
														className={styles.deleteBtnWrapper}>
														<CloseSvg styles={styles} />
													</div>
												)}
											</>
										)}
										{field.type === 'text' && (
											<>
												<RHFTextArea<postSchemaTypes>
													name={`articleContent.${index}.value`}
													label="Text"
													styles={styles}
													id={`text-${index}`}
												/>
												{index >= 3 && (
													<div
														data-index={index}
														onClick={e => handleDeleteField(e, index)}
														className={styles.deleteBtnWrapper}>
														<CloseSvg styles={styles} />
													</div>
												)}
											</>
										)}
										{field.type === 'image' && (
											<>
												<RHFAddFile<postSchemaTypes>
													name={`articleContent.${index}.value`}
													label="Content Image"
													styles={styles}
													fileRef={fileRef}
													fileIndex={index}
												/>
												{index >= 3 && (
													<div
														data-index={index}
														onClick={e => handleDeleteField(e, index)}
														className={styles.deleteBtnWrapper}>
														<CloseSvg styles={styles} />
													</div>
												)}
											</>
										)}
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
						
						<FormBtn type="submit" isSubmitting={isSubmitting} className={styles.submitBtn}>
							{isSubmitting ? (
								<>
									{editValues ? 'Saving' : 'Creating'}
									<span className={styles.animate1}>.</span>
									<span className={styles.animate2}>.</span>
									<span className={styles.animate3}>.</span>
								</>
							) : editValues ? (
								'Save'
							) : (
								'Create Post'
							)}
						</FormBtn>

						<FormBtn
							type="button"
							isSubmitting={isSubmitting}
							className={styles.resetBtn}
							handleResetFields={handleResetFields}>
							Reset
						</FormBtn>
						{editValues && (
							
							<FormBtn type="button" handleResetFields={handleClearFields} className={styles.clearAllBtn}>
								Clear All
							</FormBtn>
						)}
					</div>
				</form>
			</div>
		</FormProvider>
	)
}

export default PostForm
