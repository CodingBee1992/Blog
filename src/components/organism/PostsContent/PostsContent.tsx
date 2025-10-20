import { useEffect, useRef, useState } from 'react'
import type { PostDataProps } from '../../../types/types'
import postData from '../../../utils/postData'
import Article from '../../atoms/Article/Article'
import styles from './PostsContent.module.scss'

const PostsContent = () => {
	const [width, setWidth] = useState<number>(0)
	const [columns, setColumns] = useState<number>(0)
	const [percent, setPercent] = useState<number>(0)
	const articleRef = useRef<(HTMLDivElement | null)[]>([])
	const [wrapperHeight, setWrapperHeight] = useState<number | null>(null)

	const [styledPostData, setStyledPostData] = useState<PostDataProps[]>([])

	useEffect(() => {
		const handleSize = () => {
			setWidth(window.innerWidth)
		}
		if (width === 0) {
			handleSize()
		}

		if (width > 1400) {
			setColumns(4)
		}

		if (width <= 1400) {
			setColumns(3)
		}
		if (width < 1100) {
			setColumns(2)
		}
		if (width <= 700) {
			setColumns(1)
		}
		if (columns) {
			setPercent(Math.floor(100 / columns))
		}

		window.addEventListener('resize', handleSize)
	}, [width, columns, percent])

	useEffect(() => {
		const columnHeights = new Array(columns).fill(0)

		const updated = postData.map((post, index) => {
			const col = index % columns
			const el = articleRef.current[index]

			const height = el?.offsetHeight || 650

			const top = columnHeights[col]
			columnHeights[col] += height

			const left = `${col * percent}%`

			return { ...post, top: `${top}px`, left }
		})
		setStyledPostData(updated)

		if (columnHeights.length > 0) {
			const height = Math.max(...columnHeights)

			setWrapperHeight(height)
		}
	}, [columns, percent, width])
	

	

	return (
		<section className={styles.postsContainer}>
			<div className={styles.articleContainer}>
				<div className={styles.articleWrapper} style={{ height: `${wrapperHeight}px` }}>
					<div className={styles.lines}>
						<span></span>
						<span></span>
						<span></span>
					</div>
					{styledPostData.map(
						({ title, href, image, categories, author, text, left, top }: PostDataProps, index: number) => {
							return (
								<Article
									articleRef={el => {
										articleRef.current[index] = el
									}}
									key={index}
									href={href}
									image={image}
									title={title}
									categories={categories}
									author={author}
									text={text}
									left={left}
									top={top}
								/>
							)
						}
					)}
				</div>
			</div>

			<div className={styles.paginationContainer}>
				<button className={styles.controlBtn}>Prev</button>
				<div className={styles.paginationButtons}>
					<button>1</button>
					<button>2</button>
					<button>3</button>
					<button>4</button>
					<button>5</button>
					<button>6</button>
				</div>
				<button className={styles.controlBtn}>Next</button>
			</div>
		</section>
	)
}

export default PostsContent
