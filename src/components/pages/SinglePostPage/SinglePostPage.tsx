import { useLocation } from 'react-router'
import Seo from '../../../utils/seo'
import SinglePostTemplate from '../../templates/SinglePostTemplate/SinglePostTemplate'
import { useFetchPostByIdQuery } from '../../../slices/api/postApi'
import handleCreateUrl from '../../../hooks/createUrl'

const SinglePostPage = () => {
	const { search } = useLocation()
	const query = new URLSearchParams(search)
	const postId = query.get('id')

	const { data } = useFetchPostByIdQuery(postId, { skip: !postId })

	// if(!data) return null

	const { publishedAt, updatedAt, author, seo, mainImage, title, categories } = data

	return (
		<>
			<Seo
				title={seo.metaTitle || title}
				description={seo.metaDescription || ''}
				canonicalUrl={`${import.meta.env.VITE_SITE_URL}/${handleCreateUrl({ categories, seo, _id: postId! })}`}
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
