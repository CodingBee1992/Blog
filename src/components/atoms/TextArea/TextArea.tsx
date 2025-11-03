import { zodResolver } from '@hookform/resolvers/zod'

import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'

import { useCreateCommentMutation } from '../../../slices/api/commentSlice'
interface TextAreaProps {
	styles: Record<string, string>
	id?: number
	postId?: number
}

const schemaComment = z.object({
	comment: z.string().min(10, { message: 'Please add your comment' }),
})

type commentFields = z.infer<typeof schemaComment>

const TextArea = ({ styles, id, postId }: TextAreaProps) => {
	const [createComment] = useCreateCommentMutation()

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<commentFields>({
		resolver: zodResolver(schemaComment),
	})
	const onSubmit: SubmitHandler<commentFields> = async data => {
		try {
			await new Promise(resolve => setTimeout(resolve, 2000))
			const comment = { ...data, parentId: id || null }
			console.log(comment)
			await createComment({ postId, ...comment })
			reset()
		} catch {
			setError('root', { message: 'Please add your comment' })
		}
	}
	return (
		<form name="contactForm" method="post" autoComplete="off" id={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
			<div>
				<textarea
					{...register('comment')}
					className={styles.commentTextArea}
					name="comment"
					placeholder="Your message"
					id=""
				/>
				{errors.comment && <span className={styles.commentError}>{errors.comment.message}</span>}
			</div>
			<button disabled={isSubmitting} type="submit" className={styles.addComment}>
				{isSubmitting ? 'Sending...' : 'Add Comment'}
			</button>
		</form>
	)
}

export default TextArea
