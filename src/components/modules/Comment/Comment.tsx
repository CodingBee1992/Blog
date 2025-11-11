import { useEffect, useRef, useState, type MouseEvent } from 'react'
import type { CommentsDataProps } from '../../../types/types'
import styles from './Comment.module.scss'
import TextArea from '../../atoms/TextArea/TextArea'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'

const Comment = ({ _id, postId, parentId, author, comment, createdAt, children }: CommentsDataProps) => {
	const comRef = useRef<HTMLDivElement>(null)
	const { isLogged } = useSelector((state: RootState) => state.auth)
	const [showReply, setShowReply] = useState<boolean>(false)
	const aRef = useRef<HTMLAnchorElement | null>(null)
	const handleReply = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement

		const logIn = target.nextElementSibling

		if (!isLogged) {
			if (logIn) logIn.classList.add(styles.commentLogInShow)
		} else {
			setShowReply(true)
		}
	}
	const dataMessage = new Date(createdAt).toLocaleDateString('en-EN', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	})
	useEffect(() => {
		if (isLogged && aRef.current) {
			aRef.current.classList.remove(styles.commentLogInShow)
		}
	}, [isLogged])
	return (
		<div ref={comRef} className={styles.commentContainer} id={`${_id}`} data-postid={postId} data-parentid={parentId}>
			<div className={styles.commentAvatar}>
				<img src={author.avatar} alt="" className={styles.authorAvatar} />
			</div>
			<div className={`${styles.commentContent} ${parentId ? styles.commentLeft : ''}`}>
				<div className={styles.commentInfo}>
					<div className={styles.commentAuthor}>{author.name}</div>
					<div className={styles.commentMeta}>
						<div className={styles.commentTime}>{dataMessage}</div>
						<div className={styles.commentReply}>
							{!showReply ? (
								<button className={styles.commentReplybButton} onClick={e => handleReply(e)}>
									Reply
								</button>
							) : (
								<span className={styles.commentHideButton} onClick={() => setShowReply(false)}></span>
							)}
							<AnchorLink ref={aRef} href="/login" className={styles.commentLogIn}>
								Log In to Reply
							</AnchorLink>
						</div>
					</div>
				</div>
				<div className={styles.commentText}>
					<p>{comment}</p>
				</div>
				{children && children.length > 0 && (
					<div>
						{children.map(({ _id, parentId, author, comment, createdAt, children }) => (
							<Comment
								key={_id}
								_id={_id}
								postId={postId}
								parentId={parentId}
								author={author}
								comment={comment}
								createdAt={createdAt}
								children={children}
							/>
						))}
					</div>
				)}
				{showReply && <TextArea styles={styles} parentId={_id} postId={postId} setShowReply={setShowReply} />}
			</div>
		</div>
	)
}

export default Comment
