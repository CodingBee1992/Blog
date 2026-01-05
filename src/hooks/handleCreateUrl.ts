import slugify from 'slugify'
interface handleCreateUrlProps {
	categories: string[]
	seo:
		| {
				slug: string
				metaTitle: string
				metaDescription: string
		  }
		| undefined
	_id: string
}
const handleCreateUrl = ({ categories, seo, _id }: handleCreateUrlProps) => {
	const categorySlugs = categories
		?.map(cat => cat)
		.filter(Boolean) // usuwa undefined/null
		.map(slug => slugify(slug, { lower: true, strict: true }))
   
    
	if (categorySlugs && categorySlugs.length > 1) {
		return `/${categorySlugs.join('/')}/${seo?.slug.toLowerCase().replace(/\s+/g, '-')}?id=${_id}`
	} else {
		return `/${categorySlugs}/${seo?.slug.toLowerCase().replace(/\s+/g, '-')}?id=${_id}`
	}
}

export default handleCreateUrl
