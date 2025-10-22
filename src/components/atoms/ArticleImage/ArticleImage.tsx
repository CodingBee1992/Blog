import { usePostContext } from "../../../hooks/usePostContext"

interface ArticleImageProps {
	styles: { [key: string]: string }
}

const ArticleImage = ({ styles }: ArticleImageProps) => {
	const {image} = usePostContext()
	
	return (
		<div className={styles.imageContainer}>
			<img src={image} alt="Post Image" className={styles.image} />
		</div>
	)
}

export default ArticleImage
