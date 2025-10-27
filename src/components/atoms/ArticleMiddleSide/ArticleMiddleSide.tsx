import { usePostContext } from '../../../hooks/usePostContext'

interface ArticleMiddleSideProps {
	styles: { [key: string]: string }
}

const ArticleMiddleSide = ({ styles }: ArticleMiddleSideProps) => {
	const { articleContent, mainText } = usePostContext()

	const text = mainText
	const halfTextLength = Math.ceil(text?.length / 2)
	const dotindex = text?.indexOf('.', halfTextLength)
	const firstPart = text?.slice(0, dotindex + 1)
	const secondPart = text?.slice(dotindex + 1)

	return (
		<div className={styles.articleMiddleSideContainer}>
			<div className={styles.articleMainText}>
				<p>{firstPart}</p>
				<p>{secondPart}</p>
			</div>
			<div className={styles.articleContentContainer}>
				{articleContent.map(({ title, text, imgContent, completion, callToAction }, index) => {
					if (title) {
						return (
							<div key={index} className={styles.articleContent}>
								<h3 className={styles.articleContentTitle}>{title}</h3>
								<p className={styles.articleContentText}>{text}</p>

								{imgContent?.map(({ img, imgtext, alt }, i: number) => (
									<div key={i} className={styles.articleImage}>
										<img src={img} alt={alt} />
										<span className={styles.articleImageText}>{imgtext}</span>
									</div>
								))}
							</div>
						)
					} else {
						return (
							<div key={index}>
								<p className={styles.articleContentCompletion}>{completion}</p>
								<p className={styles.articleContentCallToAction}>{callToAction}</p>
							</div>
						)
					}
				})}
			</div>
			<div>Gallery Content</div>
		</div>
	)
}

export default ArticleMiddleSide
