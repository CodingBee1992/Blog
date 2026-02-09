import { useLocation } from 'react-router'

import styles from './EditPostPageTemplate.module.scss'
import PostForm from '../../../../organism/PostForm/PostForm'
import { useFetchPostByIdQuery } from '../../../../../slices/api/postApi'


const EditPostPageTemplate = () => {
	const { search } = useLocation()
	const params = new URLSearchParams(search)
	const postId = params.get('id')

	const { data } = useFetchPostByIdQuery(postId)

	if (!data) return
	return (
		<div className={styles.editPostContainer}>
			<PostForm editValues={data} postId={postId} />
		</div>
	)
}

export default EditPostPageTemplate
