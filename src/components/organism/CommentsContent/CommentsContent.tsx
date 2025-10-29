import { useLocation } from 'react-router'
import commentsData from '../../../utils/commentsData'
import styles from './CommentsContent.module.scss'
import Comment from '../../modules/Comment/Comment'
import type { CommentsDataProps } from '../../../types/types'

const CommentsContent = () => {
	const { search } = useLocation()
	const query = new URLSearchParams(search)
	const id = Number(query.get('id'))
	const postComments = commentsData.filter(item => item.postId === id)

	const map = new Map<number, CommentsDataProps>()
	const roots: CommentsDataProps[] = []

	postComments.forEach(c => map.set(c.id, { ...c, children: [] }))
	

	postComments.forEach(c => {
		if (c.parentId) {
			const parent = map.get(c.parentId)
			
			if (parent) parent.children?.push(map.get(c.id)!)
				
		} else {
			roots.push(map.get(c.id)!)
		}
	})
	
	return (
		<div className={styles.commentsContainer}>
			<div className={`${styles.commentsContent} row`}>
				<div className={styles.column}>
					<h3>{postComments.length} Comments</h3>

					<ol className={styles.commentList}>
						{roots.map(({id,postId,parentId,author,comment,createdAt,children}) => (
							<Comment key={id}  id={id} postId={postId} parentId={parentId} author={author} comment={comment} createdAt={createdAt} children={children}/>
						))}
					</ol>
				</div>
			</div>
		</div>
	)
}

export default CommentsContent
