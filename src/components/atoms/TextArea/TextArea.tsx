import { zodResolver } from '@hookform/resolvers/zod'

import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'

import {
	useCreateCommentMutation,
	useFetchCommentsQuery,
	useUpdateCommentMutation,
} from '../../../slices/api/commentSlice'

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { type SetStateAction, type Dispatch, useState, useEffect, type RefObject } from 'react'

interface TextAreaProps {
	styles: Record<string, string>
	parentId?: string | null
	postId?: string | null
	setShowReply?: Dispatch<SetStateAction<boolean>>
	comRef?: RefObject<HTMLDivElement | null>
	isUpdating?: boolean
	updatingText?: string | undefined
	setIsUpdating?: Dispatch<SetStateAction<boolean>>
}

const schemaComment = z.object({
	comment: z.string(),
})

type commentFields = z.infer<typeof schemaComment>

const TextArea = ({
	styles,
	parentId,
	postId,
	setShowReply,
	comRef,
	isUpdating,
	updatingText,
	setIsUpdating,
}: TextAreaProps) => {
	const [createComment] = useCreateCommentMutation()
	const [updateComment] = useUpdateCommentMutation()
	const { refetch } = useFetchCommentsQuery(postId!)
	const [resMessage, setResMessage] = useState<string>('')
	const [success, setSuccess] = useState<boolean | null>(null)
	const {
		register,
		handleSubmit,
		setError,
		reset,

		formState: { isSubmitting, errors, isSubmitSuccessful },
	} = useForm<commentFields>({
		resolver: zodResolver(schemaComment),
	})

	const onSubmit: SubmitHandler<commentFields> = async data => {


		try {
			if (isUpdating) {
				const comment = { ...data, commentId: parentId }

				const res = await updateComment({ postId, ...comment }).unwrap()

				setResMessage(res?.message)
				if (parentId) {
					setTimeout(() => {
						setShowReply?.(false)
					}, 1000)
				}
				await refetch()

				setIsUpdating?.(false)
				reset()
				return
			}
			const comment = { ...data, parentId: parentId || null }

			const res = await createComment({ postId, ...comment }).unwrap()
			setResMessage(res?.message)
			if (parentId) {
				setTimeout(() => {
					setShowReply?.(false)
				}, 1000)
			}
			await refetch()

			setTimeout(() => {
				comRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
			}, 300)

			reset()
		} catch (error: unknown) {
			if (typeof error === 'object' && error !== null) {
				const fetchError = error as FetchBaseQueryError
				const messageError =
					fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data
						? (fetchError.data.message as string)
						: 'Wystąpił nieoczekiwany błąd'

				setError('root', { message: messageError })
			} else {
				setError('root', { message: 'Wystąpił nieoczekiwany bład' })
			}
		}
	}
	useEffect(() => {
		if (isSubmitSuccessful) {
			setSuccess(true)

			const timer = setTimeout(() => {
				setSuccess(false)
				reset()
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [isSubmitSuccessful, reset])

	return (
		<form name="contactForm" method="post" autoComplete="off" id={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
			<div>
				<textarea
					{...register('comment')}
					className={styles.commentTextArea}
					name="comment"
					defaultValue={isUpdating ? updatingText : ''}
					placeholder="Your message"
					id=""
					onKeyDown={e => {
						if (e.key === 'Enter' && !e.shiftKey && !isSubmitting) {
							e.preventDefault()

							const value = (e.target as HTMLTextAreaElement).value
							if (!value.trim()) return
							onSubmit({ comment: value })
						}
					}}
				/>
				{errors.root && <span className={styles.commentError}>{errors.root.message}</span>}
				{success && <span className={styles.resMessage}>{resMessage}</span>}
			</div>
			<button disabled={isSubmitting} type="submit" className={styles.addComment}>
				{isSubmitting ? (isUpdating ? 'Updating' : 'Sending...') : isUpdating ? 'Update' : 'Add Comment'}
			</button>
		</form>
	)
}

export default TextArea
