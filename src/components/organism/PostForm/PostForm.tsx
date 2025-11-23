import { FormProvider, useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema, defaultValues, type postSchemaTypes } from '../../../types/formSchema'
import RHFInput from '../../atoms/RHFInput/RHFInput'
import RHFTextArea from '../../atoms/RHFTextArea/RHFTextArea'
import RHFAddFile from '../../atoms/RHFAddFile/RHFAddFile'
import RHFCategorySelect from '../../atoms/RHFCategorySelect/RHFCategorySelect'
import RHFSelect from '../../atoms/RHFSelect/RHFSelect'

const allCategories = [
	'LifeStyle',
	'Culture',
	'Travel',
	'Nature',
	'Photography',
	'Vacation',
	'Work',
	'Health',
	'Family',
	'Relationship',
]
const statusOptions =['draft','published']

const PostForm = () => {
	const buttons = ['title', 'text', 'image'] as const

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

		formState: { isSubmitting },
	} = methods
	const { fields: articleContent, append } = useFieldArray({ control, name: 'articleContent' })

	const onSumbit: SubmitHandler<postSchemaTypes> = async (data: postSchemaTypes) => {
		try {
			await new Promise(resolve => setTimeout(resolve, 1000))
			console.log(data)
		} catch (error) {
			console.log(error)
			setError('root', { message: 'Please fill all fields' })
		}
	}
    
	return (
		<FormProvider {...methods}>
			<div>
				<div>
					{buttons.map((btn, index) => (
						<button
							key={index}
							
							onClick={() => {
								if (btn === 'image') {
									append({ type: btn, value: { src: null, alt: '', caption: '' } })
								} else {
									append({ type: btn, value: '' })
								}
							}}>
							+ {btn}
						</button>
					))}
				</div>

				<form onSubmit={handleSubmit(onSumbit)}>
					<RHFInput<postSchemaTypes> name="mainTitle" label="Main Title" />
					<RHFTextArea<postSchemaTypes> name="introduction" label="Introduction" />
					<div>
						<RHFAddFile<postSchemaTypes> name="mainImage.src" label="Main Image" />

						<RHFInput name={`mainImage.alt`} label="Alt" />
						<RHFInput name={`mainImage.caption`} label="Caption" />
					</div>

					{articleContent &&
						articleContent?.length > 0 &&
						articleContent.map((field, index) => (
							<div key={index}>
								{field.type === 'title' && (
									<RHFInput<postSchemaTypes> name={`articleContent.${index}.value`} label="Subtitle" />
								)}
								{field.type === 'text' && (
									<RHFTextArea<postSchemaTypes> name={`articleContent.${index}.value`} label="Text" />
								)}
								{field.type === 'image' && (
									<div>
										<RHFAddFile<postSchemaTypes>
											name={`articleContent.${index}.value.src`}
											label="Image"
											index={index}
										/>
										<RHFInput name={`articleContent.${index}.value.alt`} label="Alt" />
										<RHFInput name={`articleContent.${index}.value.caption`} label="Caption" />
									</div>
								)}
							</div>
						))}

					{articleContent &&
						articleContent.map((field, index) => (
							<div key={index}>
								{field.type === 'completion' && (
									<RHFTextArea name={`articleContent.${index}.value`} label="Completion" />
								)}

								{field.type === 'callToAction' && (
									<RHFTextArea name={`articleContent.${index}.value`} label="Call to action" />
								)}
							</div>
						))}

					<RHFCategorySelect<postSchemaTypes> name="categories" options={allCategories} label="Categories" max={3} />

					<div>
						<p>SEO</p>

						<RHFInput name="seo.slug" label="Slug" />

						<RHFInput name="seo.metaTitle" label="Meta Title" />

						<RHFInput name="seo.metaDescription" label="Meta Description" />
					</div>
                    <RHFSelect  name='status' label='Status' options={statusOptions}/>
					<button disabled={isSubmitting} type="submit">
						Create Post
					</button>
				</form>
			</div>
		</FormProvider>
	)
}

export default PostForm
