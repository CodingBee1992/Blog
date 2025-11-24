import { usePostContext } from '../../../hooks/usePostContext'

interface ArticleHeaderProps {
	styles: { [key: string]: string }
}

const ArticleHeader = ({ styles }: ArticleHeaderProps) => {
	const { mainTitle } = usePostContext()

	return (
		<div className={styles.headerContainer}>
			<h1 className={styles.headerTitle}>{mainTitle}</h1>
		</div>
	)
}

export default ArticleHeader
