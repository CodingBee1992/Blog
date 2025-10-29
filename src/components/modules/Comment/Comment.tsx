import { useEffect, useRef, useState, type MouseEvent } from 'react'
import type { CommentsDataProps } from '../../../types/types'
import styles from './Comment.module.scss'
import TextArea from '../../atoms/TextArea/TextArea'

const Comment = ({ id, postId, parentId, author, comment, createdAt, children }: CommentsDataProps) => {
	const comRef = useRef<HTMLDivElement>(null)
	const isLogin = true
	const [showReply, setShowReply] = useState<boolean>(false)
	const aRef = useRef<HTMLAnchorElement | null>(null)
	const handleReply = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement

		const logIn = target.nextElementSibling
		if (!isLogin) {
			if (logIn) logIn.classList.add(styles.commentLogInShow)
		} else {
			setShowReply(true)
		}
	}

	useEffect(() => {
		if (isLogin && aRef.current) {
			aRef.current.classList.remove(styles.commentLogInShow)
		}
	}, [isLogin])
	return (
		<div ref={comRef} className={styles.commentContainer} id={`${id}`} data-postid={postId} data-parentid={parentId}>
			<div className={styles.commentAvatar}>
				<img src={author.avatar} alt="" className={styles.authorAvatar} />
			</div>
			<div className={`${styles.commentContent} ${parentId ? styles.commentLeft : ''}`}>
				<div className={styles.commentInfo}>
					<div className={styles.commentAuthor}>{author.name}</div>
					<div className={styles.commentMeta}>
						<div className={styles.commentTime}>{createdAt}</div>
						<div className={styles.commentReply}>
							{!showReply ? (
								<button onClick={e => handleReply(e)}>Reply</button>
							) : (
								<span onClick={() => setShowReply(false)}>X</span>
							)}
							<a ref={aRef} href="#" className={styles.commentLogIn}>
								Log In to Reply
							</a>
						</div>
					</div>
				</div>
				<div className={styles.commentText}>
					<p>{comment}</p>
				</div>
				{showReply && <TextArea styles={styles} id={id} postId={postId} />}
				{children && children.length > 0 && (
					<div>
						{children.map(({ id, postId, parentId, author, comment, createdAt, children }) => (
							<Comment
								key={id}
								id={id}
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
			</div>
		</div>
	)
}

export default Comment
