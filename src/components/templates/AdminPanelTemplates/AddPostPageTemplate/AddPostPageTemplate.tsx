import { useForm, type SubmitHandler } from 'react-hook-form'
import styles from './AddPostPageTemplate.module.scss'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, type MouseEvent } from 'react'

const postFields = z.object({
	MainTitle: z.string(),
	Introduction: z.string(),
	blockSchema: z.array(
		z.object({
			type: z.string(),
			value: z.union([
				z.string(),
				z.object({
					src: z.string(),
					alt: z.string(),
					caption: z.string(),
				}),
			]),
		})
	),
})

type postFieldsTypes = z.infer<typeof postFields>

const AddPostPageTemplate = () => {
	const [blocks, setBlocks] = useState<string[]>([])
	const [buttons, setButtons] = useState<string[]>(['title', 'text', 'image', 'completion', 'callToAction'])
	const handleAddContent = (e: MouseEvent<HTMLButtonElement>, btn: string) => {
		const target = e.target as HTMLButtonElement
		const dataElement = target.dataset.element
		if (dataElement === btn) {
			setBlocks(prev => [...prev, btn])
		}
	}

	const {
		handleSubmit,
		// reset,
		register,
		// setError,
		// formState: { isSubmitting, errors },
	} = useForm<postFieldsTypes>({
		defaultValues: {
			blockSchema: [
				{   
                    type:'image',
					value: {
						src: '',
                        alt:'',
                        caption:''
					},
				},
			],
		},
		resolver: zodResolver(postFields),
	})

	const onSumbit: SubmitHandler<postFieldsTypes> = async data => {
		try {
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}
	// console.log(blocks)
	return (
		<div className={styles.addPostContainer}>
			<div>
				{buttons.map((btn, index) => (
					<button key={index} data-element={btn} onClick={e => handleAddContent(e, btn)}>
						+ {btn}
					</button>
				))}
			</div>
			<form onSubmit={handleSubmit(onSumbit)}>
				<label>Title:</label>
				<input {...register('MainTitle')} type="title" placeholder="Title" />
				<label>Introduction:</label>
				<textarea {...register('Introduction')} name="text"></textarea>

				<label htmlFor="">Main Image:</label>
				<input type="file" />

				<label>Categories:</label>
				<select name="categories">
					<option value="LifeStyle">LifeStyle</option>
					<option value="Culture">Culture</option>
					<option value="Travel">Travel</option>
					<option value="Nature">Nature</option>
					<option value="Photography">Photography</option>
					<option value="Vacation">Vacation</option>
					<option value="Work">Work</option>
					<option value="Health">Health</option>
					<option value="Family">Family</option>
					<option value="Relationship">Relationship</option>
				</select>
				<label htmlFor="">SEO</label>
				<input type="text" placeholder="Slug" defaultValue="/" />
				<input type="text" placeholder="Meta Title" />
				<input type="text" placeholder="Meta Description" />

				{blocks &&
					blocks?.length > 0 &&
					blocks.map((block, index) => (
						<div key={index}>
							{block === 'title' && (
								<>
									<select {...register(`blockSchema.${index}.type`)} name="type">
										<option value={block}>{block}</option>
									</select>
									<label htmlFor="">Subtitle:</label>
									<input {...register(`blockSchema.${index}.value`)} type="text" />
								</>
							)}
							{block === 'text' && (
								<>
									<select {...register(`blockSchema.${index}.type`)} name="type">
										<option value={block}>{block}</option>
									</select>
									<label htmlFor="">Text:</label>
									<textarea {...register(`blockSchema.${index}.value`)} name="text"></textarea>
								</>
							)}
							{block === 'image' && (
								<>
									<select {...register(`blockSchema.${index}.type`)} name="type">
										<option value={block}>{block}</option>
									</select>
									<label htmlFor="">Image:</label>
									<input {...register(`blockSchema.${index}.value.src`)} type="file" />
									<input {...register(`blockSchema.${index}.value.alt`)} type="text" placeholder="Alt text" />
									<input {...register(`blockSchema.${index}.value.caption`)} type="text" placeholder="Caption" />
								</>
							)}
							{block === 'completion' && (
								<>
									<select name="type">
										<option value={block}>{block}</option>
									</select>
									<label htmlFor="">Completion:</label>
									<textarea name="completion"></textarea>
								</>
							)}
							{block === 'callToAction' && (
								<>
									<select name="type">
										<option value={block}>{block}</option>
									</select>
									<label htmlFor="">Call To Action:</label>
									<textarea name="callToAction"></textarea>
								</>
							)}
						</div>
					))}

				<button type="submit">Create Post</button>
			</form>
		</div>
	)
}

export default AddPostPageTemplate
