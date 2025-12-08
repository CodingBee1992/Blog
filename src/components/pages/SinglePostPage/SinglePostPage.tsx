import { useLocation } from 'react-router'
import Seo from '../../../utils/seo'
import SinglePostTemplate from '../../templates/SinglePostTemplate/SinglePostTemplate'
import { useFetchPostByIdQuery } from '../../../slices/api/apiSlice'

const SinglePostPage = () => {
			const {search} = useLocation()
			const query = new URLSearchParams(search)
			const postId = query.get('id')
			const {data} = useFetchPostByIdQuery(postId)
			

			const {publishedAt,updatedAt,author,seo,mainImage,title} ={...data}
			const slug = seo.slug.toLowerCase().replace(/\s+/g,'-')	
	return (
		<>
			<Seo
				title={seo.metaTitle || title}
				description={seo.metaDescription || ''}
				canonicalUrl={`${import.meta.env.VITE_SITE_URL}/blog/${slug}?id=${postId}`}
				ogImage={mainImage.src || ''}
				type="article"
				publishedTime={publishedAt}
				modifiedTime={updatedAt}
				author={author.name}
				defaultLogo={mainImage.src}
			/>
			<SinglePostTemplate />
		</>
	)
}

export default SinglePostPage
