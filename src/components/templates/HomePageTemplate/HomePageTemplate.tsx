import { useState } from 'react'
import HeroSection from '../../organism/HeroSection/HeroSection'
import PostsContent from '../../organism/PostsContent/PostsContent'
import { useFetchLimitPostsQuery } from '../../../slices/api/postApi'

const HomePageTemplate = () => {

	const [currentPage, setCurrentPage] = useState<number>(1)
	const { data } = useFetchLimitPostsQuery({ limit: 30, page: currentPage })
	return (
		<>
			<HeroSection />
			<PostsContent data={data} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
		</>
	)
}

export default HomePageTemplate
