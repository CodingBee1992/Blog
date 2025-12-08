import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import Article from '../../atoms/MasonryArticle/Article'
import styles from './PostsContent.module.scss'
import type { ArticleContentProps } from '../../../types/types'
import Aos from 'aos'
import { useFetchLimitPostsQuery } from '../../../slices/api/apiSlice'

const PostsContent = () => {
	const [width, setWidth] = useState<number>(0)
	const [columns, setColumns] = useState<number>(0)
	const [percent, setPercent] = useState<number>(0)
	const articleRef = useRef<(HTMLElement | null)[]>([])
	const [wrapperHeight, setWrapperHeight] = useState<number | null>(null)
	const heightsCache = useRef<number[]>([])

	const [styledPostData, setStyledPostData] = useState<ArticleContentProps[]>([])

	const [currentPage, setCurrentPage] = useState<number>(1)
	const [pagginationButtons, setPagginationButtons] = useState<number[]>([])

	const { data, refetch } = useFetchLimitPostsQuery({ limit: 30, page: currentPage })
	const { posts, totalPages = 1 } = { ...data }

	useEffect(() => {
		const buttons: (number | string)[] = []
		const maxVisiblePages = 5

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= maxVisiblePages; i++) {
				buttons.push(i)
			}
		} else {
			buttons.push(1)
		}
		if (currentPage > 4 && totalPages > 5) {
			buttons.push('...')
		}

		const startPage = Math.max(2, currentPage - 1)
		const endPage = Math.min(totalPages - 1, currentPage + 1)

		for (let i = startPage; i <= endPage; i++) {
			buttons.push(i)
		}
		if (currentPage < totalPages - 2) {
			buttons.push('...')
		}
		if (totalPages > 5) {
			buttons.push(totalPages)
		}

		setPagginationButtons(buttons as number[])
	}, [currentPage, totalPages])

	const handlePageChange = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement
		const direction = target.dataset.direction

		if (direction === 'prev' && currentPage > 1) {
			setCurrentPage(prev => prev - 1)
		}
		if (direction === 'next' && currentPage < totalPages) {
			setCurrentPage(prev => prev + 1)
		}

		refetch()
	}

	const handleSetPage = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement
		const value = target.textContent

		if (value === '...') return

		const page = +value!
		if (currentPage === page) return
		setCurrentPage(page)
	}

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
		if (width <= 1100) {
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

	const recalcGrid = useCallback(() => {
		if (!posts || posts.length === 0) return

		const columnHeights = new Array(columns).fill(0)
		const updated = posts.map((post: ArticleContentProps, index: number) => {
			const col = index % columns
			// const col = columnHeights.indexOf(Math.min(...columnHeights))
			const height = heightsCache.current[index]

			const top = columnHeights[col]
			columnHeights[col] += height

			const left = `${col * percent}%`

			return { ...post, top: `${top}px`, left }
		})

		setStyledPostData(updated)

		if (columnHeights.length > 0) {
			const heightCol = Math.max(...columnHeights)

			setWrapperHeight(heightCol)
		}
	}, [columns, percent, posts])
	useLayoutEffect(() => {
		recalcGrid()

		// requestAnimationFrame(() => {
		// 	const nodes = articleRef.current

		// 	if (!nodes.length) return

		// 	nodes.forEach((el, index) => {
		// 		if (!el) return

		// 		heightsCache.current[index] = el.offsetHeight
		// 	})

		// 	recalcGrid()
		// })

		const observer = new ResizeObserver(elements => {
			elements.forEach(el => {
				const target = el.target as HTMLElement
				const index = articleRef.current.indexOf(target)

				if (index === -1) return

				heightsCache.current[index] = Math.floor(el.borderBoxSize[0].blockSize) || target.offsetHeight
			})
			recalcGrid()
		})

		articleRef.current.forEach(el => {
			if (el) observer.observe(el)
		})

		return () => {
			observer.disconnect()
		}
	}, [columns, percent, width, data, refetch, posts, recalcGrid])

	const handleImageLoad = (index: number) => {
		const el = articleRef.current[index]
		if (!el) return

		heightsCache.current[index] = el.offsetHeight
		recalcGrid()
	}

	useEffect(() => {
		Aos.init({
			duration: 600,
			once: false, // lub true, jeśli chcesz tylko raz animować
		})
	}, [])
	useEffect(() => {
		Aos.refresh()
	}, [columns, percent, width,styledPostData])
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
						(
							{ _id, title, mainImage, categories, author, introduction, left, top, seo }: ArticleContentProps,
							index: number
						) => {
							return (
								<Article
									onImageLoad={() => handleImageLoad(index)}
									articleRef={el => {
										articleRef.current[index] = el
									}}
									_id={_id}
									key={_id}
									href="/blog"
									mainImage={mainImage}
									title={title}
									categories={categories}
									author={author}
									introduction={introduction}
									left={left}
									top={top}
									seo={seo}
								/>
							)
						}
					)}
				</div>
			</div>

			<div className={styles.paginationContainer}>
				<button
					data-direction="prev"
					className={`${styles.controlBtn} ${styles.paginationBtn}`}
					onClick={e => handlePageChange(e)}>
					Prev
				</button>
				<div className={styles.paginationButtons}>
					{pagginationButtons.map((btn, index) => {
						return (
							<button
								key={index}
								onClick={e => handleSetPage(e)}
								className={`${styles.paginationBtn} ${styles.paginationNumber} ${
									currentPage === btn ? styles.btnActive : ''
								}`}>
								{btn}
							</button>
						)
					})}
				</div>
				<button
					data-direction="next"
					className={`${styles.controlBtn} ${styles.paginationBtn}`}
					onClick={e => handlePageChange(e)}>
					Next
				</button>
			</div>
		</section>
	)
}

export default PostsContent
