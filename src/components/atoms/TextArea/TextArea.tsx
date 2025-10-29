import { zodResolver } from '@hookform/resolvers/zod'
import type { Dispatch, SetStateAction } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import authorAvatar from '../../../assets/avatar/user.jpg'
interface TextAreaProps {
	styles: Record<string, string>
	id?: number
	postId?: number
	showReply?:boolean
	setShowReply?: Dispatch<SetStateAction<boolean>>
}

const schemaComment = z.object({
	comment: z.string().min(10, { message: 'Please add your comment' }),
})

type commentFields = z.infer<typeof schemaComment>

const TextArea = ({ styles, id, postId,showReply, setShowReply }: TextAreaProps) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { isSubmitting, errors },
	} = useForm<commentFields>({
		resolver: zodResolver(schemaComment),
	})
	const onSubmit: SubmitHandler<commentFields> = async data => {
		try {
			const comment = {
				postId,
				parentId: id || null,
				author: { name: 'Jimba', avatar: authorAvatar },
				createdAt: new Date().toLocaleDateString('en-En', {
					day: '2-digit',
					month: 'long',
					year: 'numeric',
				}),
			}
			await new Promise(resolve => setTimeout(resolve, 2000))
			const newComment = { ...data, ...comment }
			console.log(newComment)
		} catch {
			setError('root', { message: 'Please add your comment' })
		}
	}
	return (
		<form name='contactForm' method='post' autoComplete='off' id={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
			<div>
				<textarea
					{...register('comment')}
					className={styles.commentTextArea}
					name="comment"
					placeholder="Add comment"
					id=""
				/>
				{errors.comment && <span>{errors.comment.message}</span>}
			</div>
			<button disabled={isSubmitting} type="submit">
				{isSubmitting ? 'Sending...' : 'Send'}
			</button>
			{showReply && <button onClick={() => setShowReply?.(false)}>Cancel</button>}
		</form>
	)
}

export default TextArea
