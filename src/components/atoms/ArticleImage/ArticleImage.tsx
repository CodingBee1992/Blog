import type { ArticleContentProps } from '../../../types/types'

const ArticleImage = ({ image }: ArticleContentProps) => {
	return <img src={image} alt="" />
}

export default ArticleImage
