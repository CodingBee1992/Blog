import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { FormProvider, useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema, defaultValues, type postSchemaTypes } from '../../../types/formSchema'
import RHFInput from '../../atoms/RHFInput/RHFInput'
import RHFTextArea from '../../atoms/RHFTextArea/RHFTextArea'
import RHFAddFile from '../../atoms/RHFAddFile/RHFAddFile'
import RHFCategorySelect from '../../atoms/RHFCategorySelect/RHFCategorySelect'
import RHFSelect from '../../atoms/RHFSelect/RHFSelect'
import { useCreatePostMutation, useUpdatePostMutation } from '../../../slices/api/postApi'
import styles from './PostForm.module.scss'
import uploadToCloudinary from '../../../hooks/useUploadToCloudinary'
import { defaultCategories, statusOptions } from '../../../utils/data'
import FormBtn from '../../atoms/FormBtn/FormBtn'
import { useFetchAllCategoriesQuery } from '../../../slices/api/categoriesApi'
import {
	useDestroyCloudinaryImageMutation,
	useCreateCloudinarySignatureMutation,
} from '../../../slices/api/cloudinaryApi'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { adminLinks } from '../../../utils/sideBarLinks'
import { CloseSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'

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
	const [createSignature] = useCreateCloudinarySignatureMutation()
	const [updatePost] = useUpdatePostMutation()
	const [destroyCloudinaryImage] = useDestroyCloudinaryImageMutation()
	const { data } = useFetchAllCategoriesQuery()
	const [postMessage, setPostMessage] = useState<string>('')
	const allCategories = data && data?.length > 0 ? data : defaultCategories
	const [progress, setProgress] = useState<number>(0)

	const [animatedProgress, setAnimatedProgress] = useState<number>(0)

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

		formState: { isSubmitting, isSubmitSuccessful, isDirty },
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
				const filesToUpload: { file: File; type: 'main' | 'content'; index?: number }[] = []

				// Zliczamy wszystkie uploadowane pliki
				if (data.mainImage.src instanceof File) {
					filesToUpload.push({ file: data.mainImage.src, type: 'main' })
				}

				data.articleContent.forEach((item, index) => {
					if (item.type === 'image' && item.value.src instanceof File) {
						filesToUpload.push({ file: item.value.src, type: 'content', index })
					}
				})

				let uploaded = 0
				const total = filesToUpload.length

				const updateGlobalProgress = (localProgress: number) => {
					// global progress = średnia ważona
					const progressPerFile = 100 / total
					const globalProgress = uploaded * progressPerFile + (localProgress / 100) * progressPerFile
					setProgress(Math.round(globalProgress * 10) / 10)
				}

				const dataSignature = await createSignature({ uploadFolder }).unwrap()
				
				let mainImage = data.mainImage
				const articleContent = [...data.articleContent]

				for (const fileObj of filesToUpload) {
					const uploadedData = await uploadToCloudinary({
						file: fileObj.file,
						uploadFolder,
						dataSignature,
						onProgress: updateGlobalProgress,
					})

					uploaded++ // kończenie pliku

					if (fileObj.type === 'main') {
						mainImage = {
							...mainImage,
							src: uploadedData.secure_url,
							public_id: uploadedData.public_id,
						}
					} else if (fileObj.type === 'content' && fileObj.index !== undefined) {
						const idx = fileObj.index
						const item = articleContent[idx]

						if (item.type === 'image') {
							articleContent[idx] = {
								...item,
								value: {
									...item.value,
									src: uploadedData.secure_url,
									public_id: uploadedData.public_id,
								},
							}
						}
					}
				}

				const updatedData = { ...data, articleContent, mainImage }

				const res = await createPost({ updatedData }).unwrap()
				if (res) {
					setPostMessage(res.message)
					setProgress(0)
				}
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
					}),
				)
				if (imagesToDestroy.length > 0) {
					imagesToDestroy.forEach(item => {
						destroyCloudinaryImage(item)
					})
				}

				const updatedData = { ...data, mainImage, articleContent }

				const res = await updatePost({ postId, updatedData }).unwrap()
				if (res) setPostMessage(res.message)
				reset(defaultValues)
			}
		} catch (error) {
			if (typeof error === 'object' && error !== null) {
				const fetchError = error as FetchBaseQueryError
				const message =
					fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data
						? (fetchError.data.message as string)
						: 'An unexpected error has occured'
				setError('root', { message })
			}
			setError('root', { message: 'An unexpected error has occured' })
		}
	}

	useEffect(() => {
		let frame: number

		const animate = () => {
			setAnimatedProgress(prev => {
				const diff = progress - prev

				if (Math.abs(diff) < 0.1) return progress

				return prev + diff * 0.1 // im mniejsze, tym wolniej i płynniej
			})

			frame = requestAnimationFrame(animate)
		}

		frame = requestAnimationFrame(animate)

		return () => cancelAnimationFrame(frame)
	}, [progress])



	if (isSubmitSuccessful) window.scrollTo({ top: 0, behavior: 'smooth' })
	if (editValues && isSubmitSuccessful)
		return (
			<div className={styles.updateContainer}>
				<div className={styles.updateWrapper}>
					<p>{postMessage}</p>
				</div>
			</div>
		)
	return (
		<FormProvider {...methods}>
			<div className={styles.postFormContainer}>
				{progress > 0 && (
					<div className={styles.progressWrapper}>
						<div style={{ width: `${animatedProgress}%` }} className={styles.progress}></div>
					</div>
				)}

				<div className={styles.postFormControllersWrapper}>
					<div className={styles.postFormControllers}>
						{buttons.map((btn, index) => (
							<button
								type="button"
								disabled={isSubmitting}
								className={styles.postFormBtns}
								key={index}
								onClick={() => {
									const newIndex = articleContent.length - 2
									if (btn === 'image') {
										insert(newIndex, {
											type: btn,
											value: { src: null, alt: '', caption: '', public_id: '' },
										})
									} else {
										insert(newIndex, { type: btn, value: '' })
									}
								}}>
								+ {btn}
							</button>
						))}
					</div>
				</div>

				<form onSubmit={handleSubmit(onSumbit)} className={styles.formContainer} aria-busy={isSubmitting}>
					<div className={styles.formWrapper}>
						<div className={styles.formFlex}>
							<RHFInput<postSchemaTypes>
								type="text"
								name="title"
								label="Main Title"
								styles={styles}
								id={`title-title`}
								isSubmitting={isSubmitting}
							/>
							<RHFTextArea<postSchemaTypes>
								name="introduction"
								label="Introduction"
								styles={styles}
								id={`text-Intro`}
								isSubmitting={isSubmitting}
							/>

							<RHFAddFile<postSchemaTypes>
								name="mainImage.src"
								label="Main Image"
								styles={styles}
								fileRef={fileRef}
								fileIndex={-1}
								id="mainImage"
								isSubmitting={isSubmitting}>
								<div className={styles.imageBox}>
									<RHFInput<postSchemaTypes>
										name={`mainImage.alt`}
										type="text"
										label="Alt"
										styles={styles}
										id={`mainImageAlt`}
										isSubmitting={isSubmitting}
									/>
									<RHFInput<postSchemaTypes>
										name={`mainImage.caption`}
										type="text"
										label="Caption"
										styles={styles}
										id={`mainImageCaption`}
										isSubmitting={isSubmitting}
									/>
								</div>
							</RHFAddFile>

							{articleContent &&
								articleContent?.length > 0 &&
								articleContent.map((field, index) => (
									<>
										{field.type === 'title' && (
											<div key={field.id} className={styles.fieldBox}>
												<RHFInput<postSchemaTypes>
													type="text"
													id={`title-${index}`}
													name={`articleContent.${index}.value`}
													label="Subtitle"
													styles={styles}
													isSubmitting={isSubmitting}
												/>
												{index >= 3 && (
													<div
														data-index={index}
														onClick={e => handleDeleteField(e, index)}
														className={styles.deleteBtnWrapper}>
														<CloseSVG className={styles.icon} />
													</div>
												)}
											</div>
										)}
										{field.type === 'text' && (
											<div key={field.id} className={styles.fieldBox}>
												<RHFTextArea<postSchemaTypes>
													name={`articleContent.${index}.value`}
													label="Text"
													styles={styles}
													id={`text-${index}`}
													isSubmitting={isSubmitting}
												/>
												{index >= 3 && (
													<div
														data-index={index}
														onClick={e => handleDeleteField(e, index)}
														className={styles.deleteBtnWrapper}>
														<CloseSVG className={styles.icon} />
													</div>
												)}
											</div>
										)}
										{field.type === 'image' && (
											<div key={field.id} className={styles.fieldBox}>
												<RHFAddFile<postSchemaTypes>
													name={`articleContent.${index}.value.src`}
													label="Content Image"
													styles={styles}
													fileRef={fileRef}
													fileIndex={index}
													id={`file${index}`}
													isSubmitting={isSubmitting}>
													<div className={styles.imageBox}>
														<RHFInput<postSchemaTypes>
															name={`articleContent.${index}.value.alt`}
															type="text"
															label="Alt"
															styles={styles}
															id={`alt${index}`}
															isSubmitting={isSubmitting}
														/>
														<RHFInput<postSchemaTypes>
															name={`articleContent.${index}.value.caption`}
															type="text"
															label="Caption"
															styles={styles}
															id={`caption${index}`}
															isSubmitting={isSubmitting}
														/>
													</div>
												</RHFAddFile>
												{index >= 3 && (
													<div
														data-index={index}
														onClick={e => handleDeleteField(e, index)}
														className={styles.deleteBtnWrapper}>
														<CloseSVG className={styles.icon} />
													</div>
												)}
											</div>
										)}
										{field.type === 'completion' && (
											<RHFTextArea
												name={`articleContent.${index}.value`}
												label="Completion"
												styles={styles}
												id={`text-${index}`}
												isSubmitting={isSubmitting}
											/>
										)}

										{field.type === 'callToAction' && (
											<RHFTextArea
												name={`articleContent.${index}.value`}
												label="Call to action"
												styles={styles}
												id={`text-${index}`}
												isSubmitting={isSubmitting}
											/>
										)}
									</>
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
									isSubmitting={isSubmitting}
								/>

								<div className={styles.seoContainer}>
									<p className={styles.seoTitle}>SEO</p>

									<RHFInput
										type="text"
										name="seo.slug"
										label="Slug"
										styles={styles}
										id={`title-slug`}
										isSubmitting={isSubmitting}
									/>

									<RHFInput
										type="text"
										name="seo.metaTitle"
										label="Meta Title"
										styles={styles}
										id={`title-metaTitle`}
										isSubmitting={isSubmitting}
									/>

									<RHFInput
										type="text"
										name="seo.metaDescription"
										label="Meta Description"
										styles={styles}
										id={`title-metaDesc`}
										isSubmitting={isSubmitting}
									/>
								</div>
								<RHFSelect
									name="status"
									id="status"
									label="Status"
									isSubmitting={isSubmitting}
									options={statusOptions}
									styles={styles}
								/>
							</div>
						</div>
					</div>
					<div className={styles.submitBtns}>
						<FormBtn
							type="submit"
							isSubmitting={isSubmitting}
							className={`${styles.submitBtn} ${isSubmitting ? styles.isSubmitting : ''} ${isDirty ? styles.save : ''}`}>
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
							className={`${styles.clearButton} ${isSubmitting ? styles.isSubmitting : ''}`}
							handleResetFields={handleResetFields}>
							Clear
						</FormBtn>
						{editValues && (
							<>
								<FormBtn
									type="button"
									isSubmitting={isSubmitting}
									handleResetFields={handleClearFields}
									className={`${styles.clearAllBtn} ${isSubmitting ? styles.isSubmitting : ''}`}>
									Clear All
								</FormBtn>
								<AnchorLink
									href={adminLinks?.[2]?.children?.[0]?.href ?? '/'}
									ariaLabel="Cancel"
									className={`${styles.cancelUpdate} ${isSubmitting ? styles.isSubmitting : ''}`}>
									Cancel
								</AnchorLink>
							</>
						)}
					</div>
				</form>
			</div>
		</FormProvider>
	)
}

export default PostForm
