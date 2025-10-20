import { useEffect, useRef, useState } from 'react'
import type { PostDataProps } from '../../../types/types'
import postData from '../../../utils/postData'
import Article from '../../atoms/Article/Article'
import styles from './PostsContent.module.scss'

const PostsContent = () => {
	const [width, setWidth] = useState<number>(0)
	const [columns, setColumns] = useState<number>(0)
	const [percent, setPercent] = useState<number>(0)
	const [minusHeight, setMinusHeight] = useState<number>(0)
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
		const article = articleRef.current

		if (!article) return

		const updateLayout = () => {
			const arrayArticlesHeight = article.map(item => item?.offsetHeight || 0)

			const totalHeight = arrayArticlesHeight.reduce((acc, h) => acc + (h || 0), 0)

			const rows = Math.ceil(postData.length / columns)

			const subtractedElement = arrayArticlesHeight.slice(rows, arrayArticlesHeight.length)

			if (subtractedElement.length > 0) {
				const amountToBeDeducted = subtractedElement.reduce((acc, h) => acc + h, 0)
				setMinusHeight(amountToBeDeducted)
			}else{
				setMinusHeight(0)
			}

			if (totalHeight) {
				const height = totalHeight - minusHeight
				setWrapperHeight(height)
			}
		}
		updateLayout()

		const observer = new ResizeObserver(updateLayout)

		article.forEach(ref => {
			if (ref) observer.observe(ref)
		})

		return () => observer.disconnect()
	}, [columns, minusHeight, width])
	

	useEffect(() => {
		

		const columnHeights = new Array(columns).fill(0)
		
		const updated = postData.map((post,index)=>{
			const col = index % columns
			const el = articleRef.current[index]

			const height = el?.offsetHeight || 650

			const top = columnHeights[col]
			columnHeights[col] += height
			console.log(top);
			const left = `${col * percent}%`

			return {...post,top:`${top}px`,left}

		})

		setStyledPostData(updated)
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
