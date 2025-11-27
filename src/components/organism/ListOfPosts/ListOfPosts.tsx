import {
	ArrowDownSVG,
	ArrowNextSVG,
	ArrowPrevSVG,
	PencilSVG,
	TrashSVG,
} from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import { useFetchPostsByLimitQuery } from '../../../slices/api/apiSlice'
import type { ExtendedArticleContentProps } from '../../../types/types'
import styles from './ListOfPosts.module.scss'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { useEffect, useRef, useState, type MouseEvent } from 'react'

const thead = ['Title', 'Author', 'Category', 'Created At', 'Published At', 'Comments', 'Views', 'Status', 'Actions']
const rowsNumbers = [10, 25, 50]

const ListOfPosts = () => {
	const [rows, setRows] = useState<number>(10)
	const [page, setPage] = useState<number>(1)
	const rowsRef = useRef<HTMLDivElement | null>(null)
	const { data } = useFetchPostsByLimitQuery({ limit: rows, page: page })

	const handleSelectRows = () => {
		const arrow = document.querySelector(`.${styles.arrowRows}`)
		if (rowsRef.current && !rowsRef.current.classList.contains(styles.scale)) {
			rowsRef.current?.classList.add(styles.scale)
			arrow?.classList.add(styles.rotate)
		} else {
			rowsRef.current?.classList.remove(styles.scale)
			arrow?.classList.remove(styles.rotate)
		}
	}
	useEffect(() => {
		const handleCloseSelect = (e: globalThis.MouseEvent) => {
			const el = rowsRef.current
			const target = e.target as HTMLElement
			const arrow = document.querySelector(`.${styles.arrowRows}`)

			if (!target.classList.contains(styles.inputBox) && el?.classList.contains(styles.scale)) {
				el?.classList.remove(styles.scale)
				arrow?.classList.remove(styles.rotate)
			}
		}

		window.addEventListener('click', handleCloseSelect)

		return () => window.removeEventListener('click', handleCloseSelect)
	}, [])

	const handleChangePage = (e: MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement

		if (target.dataset.element === 'prev') {
			if (page > 1) {
				setPage(prev => prev - 1)
			}
		} else {
			if (page !== totalPages) {
				setPage(prev => prev + 1)
			}
		}
	}

	if (!data) return
	const { posts, totalPages } = data
	return (
		<div className={styles.listWrapper}>
			<div className={styles.listContainer}>
				<h3 className={styles.listTitle}>List</h3>
				<div className={styles.tableContainer}>
					<div className={styles.thead}>
						{posts && (
							<div className={styles.tr}>
								{thead.map((item, index) => {
									if (item !== 'Actions') {
										return (
											<div key={index}>
												{item} <ArrowDownSVG />
											</div>
										)
									} else {
										return <div key={index}>{item}</div>
									}
								})}
							</div>
						)}
					</div>
					<div className={styles.tbody}>
						{posts &&
							posts.map((item: ExtendedArticleContentProps, index: number) => (
								<div key={index} className={styles.tr}>
									<div>
										<AnchorLink className={styles.tabelTitle} href={`/blog/?id=${item._id}`}>
											{item.mainTitle}
										</AnchorLink>
									</div>
									<div>{item.author.name}</div>
									<div>{item.categories.join(',')}</div>
									<div>{new Date(item.createdAt).toLocaleDateString()}</div>
									<div className={item.publishedAt ? '' : styles.publish}>
										{item.publishedAt ? item.publishedAt : 'Publish'}
									</div>
									<div>{item.comments.length}</div>
									<div>435</div>
									<div>{item.status}</div>
									<div>
										<AnchorLink href={`/admin/posts/editpost/?id=${item._id}`}>
											<PencilSVG />
										</AnchorLink>
										<TrashSVG />
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
			<div className={styles.pagination}>
				<div className={styles.paginationRows}>
					<span>Rows per page:</span>
					<div className={styles.selectRows}>
						<div className={styles.inputBox} onClick={() => handleSelectRows()}>
							<input className={styles.selectInput} value={rows} type="text" name="rows" readOnly />
							<ArrowDownSVG className={styles.arrowRows} />
						</div>
						<div ref={rowsRef} className={styles.rows}>
							{rowsNumbers.map((row, index) => (
								<span
									key={index}
									data-value={row}
									className={rows === row ? styles.activeRow : ''}
									onClick={(e: MouseEvent<HTMLSpanElement>) => {
										const target = e.currentTarget as HTMLSpanElement
										setRows(Number(target.dataset.value))

										handleSelectRows()
									}}>
									{row}
								</span>
							))}
						</div>
					</div>
				</div>
				<div className={styles.arrowsControls}>
					<div data-element="prev" className={styles.arrows} onClick={e => handleChangePage(e)}>
						<ArrowPrevSVG className={styles.arrowPrev} />
					</div>
					<div data-element="next" className={styles.arrows} onClick={e => handleChangePage(e)}>
						<ArrowNextSVG className={styles.arrowNext} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListOfPosts
