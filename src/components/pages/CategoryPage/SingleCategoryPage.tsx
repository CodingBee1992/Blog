import Seo from '../../../utils/seo'
import SingleCategoryPageTemplate from '../../templates/SingleCategoryPageTemplate/SingleCategoryPageTemplate'

const SingleCategoryPage = ({ name }: { name: string }) => {
	const slug = name.toLowerCase().replace(/\s+/g,'-')
	return (
		<>
			<Seo
				title={name}
				description={`Posty i artykuły z kategorii ${name}`}
				canonicalUrl={`${import.meta.env.VITE_SITE_URL}/categories/${slug}`}
				type="website"
			/>
			<SingleCategoryPageTemplate name={name} />
		</>
	)
}

export default SingleCategoryPage

