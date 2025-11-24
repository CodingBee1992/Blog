import { usePostContext } from '../../../hooks/usePostContext'




interface ArticleImageProps {
	styles: { [key: string]: string }
}

const ArticleImage = ({ styles }: ArticleImageProps) => {
	const { mainImage } = usePostContext()

	return (
		<div className={styles.imageContainer}>
			<img src={mainImage.src} alt={mainImage.alt} className={styles.image} />
		</div>
	)
}

export default ArticleImage
