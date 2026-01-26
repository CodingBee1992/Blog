import { useState } from 'react'
import HeaderText from '../../atoms/HeaderText/HeaderText'
import PostsContent from '../../organism/PostsContent/PostsContent'
import styles from './SingleCategoryPageTemplate.module.scss'
import { useFetchLimitPostsQuery } from '../../../slices/api/postApi'

const SingleCategoryPageTemplate = ({ name }: { name: string }) => {
	const [currentPage, setCurrentPage] = useState<number>(1)
	const { data } = useFetchLimitPostsQuery({ limit: 30, page: currentPage })

	return (
		<section className={`${styles.categoryContainer} sectionPages`}>
			<HeaderText>
				<h1>{name}</h1>
			</HeaderText>
			<PostsContent data={data} currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</section>
	)
}

export default SingleCategoryPageTemplate
