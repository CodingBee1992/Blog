import { useEffect, useRef, useState } from 'react'
import type { PostDataProps } from '../../../types/types'
import postData from '../../../utils/postData'
import Article from '../../atoms/Article/Article'
import styles from './PostsContent.module.scss'


const PostsContent = () => {
	const [width, setWidth] = useState<number>(0)
	const [columns, setColumns] = useState<number>(0)
	const [percent, setPercent] = useState<number>(0)
	const [minusHeight,setMinusHeight]=useState<number>(0)
	const articleRef = useRef<(HTMLDivElement | null)[]>([])
	const [wrapperHeight, setWrapperHeight] = useState<number | null>(null)

	useEffect(() => {
		const handleSize = () => {
			setWidth(window.innerWidth)
		}
		if (width === 0) {
			handleSize()
		}

		if (width > 1400) {
			setColumns(4)
			setPercent(25)
		}

		if (width <= 1400) {
			setColumns(3)
			setPercent(33)
		}
		if (width < 1100) {
			setColumns(2)
			setPercent(50)
		}
		if (width <= 700) {
			setColumns(1)
			setPercent(100)
		}
		window.addEventListener('resize', handleSize)
	}, [width])

	useEffect(() => {
		const article = articleRef.current

		if (!article) return

		const updateLayout = () => {
			const arrayArticlesHeight = article.map(item => item?.offsetHeight || 0)

			const totalHeight = arrayArticlesHeight.reduce((acc, h) => acc + (h || 0), 0)
			console.log(`Total height: ${totalHeight}`);
			const rows = Math.ceil(postData.length / columns)

			const subtractedElement = arrayArticlesHeight.slice(rows, arrayArticlesHeight.length)
			
			if (subtractedElement.length > 0) {
				const amountToBeDeducted = subtractedElement.reduce((acc, h) => acc + h, 0)
				console.log(`Amount to be deducted: ${amountToBeDeducted}`);
				setMinusHeight(amountToBeDeducted)
			}

			if (totalHeight) {
				const height = totalHeight - minusHeight
				console.log(`Height: ${height}`);
				setWrapperHeight(height)
			}
		}
		updateLayout()

		const observer = new ResizeObserver(updateLayout)

		article.forEach(ref => {
			if (ref) observer.observe(ref)
		})

		return () => observer.disconnect()
	}, [columns, minusHeight])

	const styledPostData = postData.map((post, index) => {
		const heightTop = articleRef.current[index]?.offsetHeight

		const left = `${(index % columns) * percent}%`
		const top = `${Math.floor(index / columns) * heightTop}px`

		return { ...post, top, left }
	})

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
