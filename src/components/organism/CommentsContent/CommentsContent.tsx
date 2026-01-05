import { useLocation } from 'react-router'

import styles from './CommentsContent.module.scss'
import Comment from '../../modules/Comment/Comment'
import type { CommentsDataProps } from '../../../types/types'
import TextArea from '../../atoms/TextArea/TextArea'

import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { useFetchCommentsQuery } from '../../../slices/api/commentsApi'
import { useEffect, useState } from 'react'

const CommentsContent = () => {
	const { search } = useLocation()
	
	const query = new URLSearchParams(search)
	const postId = query.get('id')
	const { data: postComments } = useFetchCommentsQuery(postId!, { skip: !postId })

	const { isLogged } = useSelector((state: RootState) => state.auth)

	const [roots, setRoots] = useState<CommentsDataProps[]>([])
	
	useEffect(() => {
		if (!postComments) return
		try {
			const map = new Map<string, CommentsDataProps>()
			const roots: CommentsDataProps[] = []

			postComments?.forEach((c: CommentsDataProps) => {
				map.set(c._id, { ...c, children: [] })
			})
			postComments?.forEach((c: CommentsDataProps) => {
				if (c.parentId) {
					const parent = map.get(c.parentId)
					if (parent) parent.children?.push(map.get(c._id)!)
				} else {
					roots.push(map.get(c._id)!)
				}
			})

			setRoots(roots)
		} catch (error) {
			console.log('Something goes wrong:', error)
		}
	}, [postComments])

	return (
		<div className={styles.commentsContainer}>
			<div className={`${styles.commentsContent} row`}>
				<div className={`column`}>
					<h3>Comments</h3>

					<ol className={styles.commentList}>
						{roots?.length > 0 &&
							roots.map(({ _id, parentId, author, comment, createdAt, children }) => (
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
					</ol>
				</div>
			</div>
			<div className={`${styles.commentFormContainer} row`}>
				<div className={`column`}>
					{isLogged ? (
						<>
							<h3>Add Comment</h3>
							<TextArea styles={styles} postId={postId} />
						</>
					) : (
						<>
							<h3>Sign In to Add Comment</h3>
							<AnchorLink className={styles.commentAnchorSignin} href="/login">
								Sign In
							</AnchorLink>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default CommentsContent
