interface ArticleRightSideProps {
	styles: { [key: string]: string }
}

const ArticleRightSide = ({ styles }: ArticleRightSideProps) => {
	return <div className={styles.articleRightSideContainer}>ArticleRightSide</div>
}

export default ArticleRightSide
