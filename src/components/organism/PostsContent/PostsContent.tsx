import { useEffect, useRef, useState, type MouseEvent } from 'react'

import postData from '../../../utils/postData'
import Article from '../../atoms/Article/Article'
import styles from './PostsContent.module.scss'
import type { PostDataProps } from '../../../types/types'

const PostsContent = () => {
	const [width, setWidth] = useState<number>(0)
	const [columns, setColumns] = useState<number>(0)
	const [percent, setPercent] = useState<number>(0)
	const articleRef = useRef<(HTMLDivElement | null)[]>([])
	const [wrapperHeight, setWrapperHeight] = useState<number | null>(null)

	const [styledPostData, setStyledPostData] = useState<PostDataProps[]>([])

	const [currentPage, setCurrentPage] = useState<number>(1)
	const [pagginationButtons, setPagginationButtons] = useState<number[]>([])

	const totalProducts = 3000
	const itemsPerPage = 30
	const totalPages = Math.ceil(totalProducts / itemsPerPage)

	useEffect(() => {
		const buttons: (number | string)[] = []
		const maxVisiblePages = 5

		if (totalPages <= maxVisiblePages + 2) {
			for (let i = 1; i <= totalPages; i++) {
				buttons.push(i)
			}
		} else {
			buttons.push(1)
		}
		if (currentPage > 4) {
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
		buttons.push(totalPages)

		setPagginationButtons(buttons as number[])
	}, [currentPage, totalPages, totalProducts])

	const handlePageChange = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement
		const direction = target.dataset.direction
		
		if (direction === 'prev' && currentPage > 1) {
			setCurrentPage(prev => prev - 1)
		}
		if (direction === 'next' && currentPage < totalPages) {
			setCurrentPage(prev => prev + 1)
		}
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
		   const timeout = setTimeout(() => {
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
		}, 100)

		return () => clearTimeout(timeout)
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
						({id, title, href, image, categories, author, text, left, top }: PostDataProps, index: number) => {
							
							return (
								<Article 
									articleRef={el => {
										articleRef.current[index] = el
									}}
									id={id}
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
