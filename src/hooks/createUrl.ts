import slugify from 'slugify'
interface createURLProps {
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
const createUrl = ({ categories, seo, _id }: createURLProps) => {
	const categorySlugs = categories
		?.map(cat => cat)
		.filter(Boolean) // usuwa undefined/null
		.map(slug => slugify(slug, { lower: true, strict: true }))
   
    
	if (categorySlugs && categorySlugs.length > 1) {
		return `/post/${categorySlugs.join('/')}/${seo?.slug.toLowerCase().replace(/\s+/g, '-')}?id=${_id}`
	} else {
		return `/post/${categorySlugs}/${seo?.slug.toLowerCase().replace(/\s+/g, '-')}?id=${_id}`
	}
}

export default createUrl
