import { usePostContext } from '../../../hooks/usePostContext'
import ResponsiveArticleImage from '../ResponsiveArticleImage/ResponsiveArticleImage'




interface ArticleImageProps {
	styles: { [key: string]: string }
}

const ArticleImage = ({ styles }: ArticleImageProps) => {
	const { mainImage } = usePostContext()

	return (
		<div className={styles.imageContainer}>
			<ResponsiveArticleImage mainImageSrc={mainImage.src} imageAlt={mainImage.alt} className={styles.image} />
			
		</div>
	)
}

export default ArticleImage
