import {
	ArrowDownSVG,
	ArrowNextSVG,
	ArrowPrevSVG,
	PencilSVG,
	TrashSVG,
} from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import { useDeletePostMutation, useFetchPostsByLimitQuery, usePublishPostMutation } from '../../../slices/api/apiSlice'
import type { ExtendedArticleContentProps } from '../../../types/types'
import styles from './ListOfPosts.module.scss'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { useEffect, useRef, useState, type ChangeEvent, type MouseEvent } from 'react'

import useDebounce from '../../../hooks/useDebounce'
import { SearchSvg } from '../../../assets/icons/nav/SearchSvg'
import { rowsNumbers, status, thead } from '../../../utils/data'
import { categories } from '../../../containers/Navigation/dataNavigation/dataNavigation'

const ListOfPosts = () => {
	const rowsRef = useRef<HTMLDivElement | null>(null)

	const [rows, setRows] = useState<number>(10)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [sort, setSort] = useState({
		sortBy: '',
		order: '',
	})
	const [category, setCategory] = useState<string>('')
	const [start, setStart] = useState<number>()
	const [end, setEnd] = useState<number>()
	const [inputValue, setInputValue] = useState<string>('')
	const search = useDebounce(inputValue, 500)
	const { data, refetch } = useFetchPostsByLimitQuery({
		limit: rows,
		page: currentPage,
		search: search,
		sortBy: sort.sortBy,
		order: sort.order,
		category: category,
	})
	const [deletePost] = useDeletePostMutation()
	const [publishPost] = usePublishPostMutation()
	const { posts = [], totalPages = 1, total = 1 } = data ?? {}

	useEffect(() => {
		refetch()
	}, [data, refetch])

	const handleSetInputValue = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement
		const value = target.value
		setInputValue(value)
	}

	useEffect(() => {
		if (inputValue === '') {
			setSort({ sortBy: '', order: '' })
			setCategory('')
		}
	}, [inputValue])

	const handleSetSort = (e: MouseEvent<HTMLDivElement>) => {
		const target = e.currentTarget as HTMLDivElement
		const el = target.dataset.element
		const lastChild = target.lastElementChild

		const allLastChild = document.querySelectorAll(`.${styles.scaleUp}`)

		if (!lastChild?.classList.contains(styles.scaleUp)) {
			if (allLastChild) allLastChild.forEach(el => el.classList.remove(styles.scaleUp))

			lastChild?.classList.add(styles.scaleUp)
		} else {
			lastChild?.classList.remove(styles.scaleUp)
		}

		if (!el || el === 'status' || el === 'categories') return
		if (el === 'createdAt' || el === 'publishedAt' || el === 'comments') {
			setSort(prev => {
				const newOrder = prev.sortBy === el ? (prev.order === 'asc' ? 'desc' : 'asc') : 'desc'

				return { sortBy: el, order: newOrder }
			})
			return
		}
		
		setSort(prev => {
			const newOrder = prev.sortBy === el ? (prev.order === 'desc' ? 'asc' : 'desc') : 'asc'

			return { sortBy: el, order: newOrder }
		})
	}
	const handleSetCategory = (item: string) => {
		setCategory(item)
		setSort({ sortBy: 'categories', order: 'desc' })
	}
	useEffect(() => {
		const start = (currentPage - 1) * rows + 1
		if (currentPage > totalPages) {
			setCurrentPage(totalPages === 0 ? 1 : totalPages)
		}
		setStart(start)
		const end = Math.min(rows * currentPage, total)
		setEnd(end)
	}, [currentPage, rows, total, totalPages])

	const handleOpenRows = () => {
		const arrow = document.querySelector(`.${styles.arrowRows}`)
		if (rowsRef.current && !rowsRef.current.classList.contains(styles.scale)) {
			rowsRef.current?.classList.add(styles.scale)
			arrow?.classList.add(styles.rotate)
		} else {
			rowsRef.current?.classList.remove(styles.scale)
			arrow?.classList.remove(styles.rotate)
		}
	}

	const handleSelectRows = (e: MouseEvent<HTMLSpanElement>) => {
		const target = e.currentTarget as HTMLSpanElement
		setRows(Number(target.dataset.value))

		handleOpenRows()
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

	const handleChangePage = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement

		if (target.dataset.element === 'prev') {
			if (currentPage > 1) {
				setCurrentPage(prev => prev - 1)
			}
		} else {
			if (currentPage !== totalPages) {
				setCurrentPage(prev => prev + 1)
			}
		}
	}

	const handleDeletePost = async (e: MouseEvent<HTMLDivElement>) => {
		const target = e.currentTarget as HTMLDivElement
		const postId = target.dataset.id
	
		try {
			await deletePost(postId).unwrap()

			refetch()
		} catch (error) {
			console.log(error)
		}
	}
	const handlePublishPost = async (e: MouseEvent<HTMLParagraphElement>) => {
		const target = e.currentTarget as HTMLParagraphElement
		const postId = target.dataset.id

		try {
			await publishPost(postId).unwrap()

			refetch()
		} catch (error) {
			console.log(error)
		}
	}
	// if (isFetching) return <Loader />
	return (
		<div className={styles.listWrapper}>
			<h3 className={styles.listTitle}>List</h3>
			<div className={styles.searchContainer}>
				<label className={styles.searchBox}>
					<input
						className={styles.searchInput}
						type="text"
						placeholder="Search..."
						onChange={e => handleSetInputValue(e)}
					/>
					<button className={styles.searchBtn}>
						<SearchSvg className={styles.searchIcon} />
					</button>
				</label>
			</div>
			<div className={styles.listContainer}>
				<div className={styles.tableContainer}>
					<div className={styles.thead}>
						{posts && (
							<div className={styles.tr}>
								{thead.map((item, index) => {
									if (item !== 'actions') {
										if (item === 'categories' || item === 'status') {
											return (
												<div data-element={item} className={styles.th} key={index} onClick={e => handleSetSort(e)}>
													{item} <ArrowDownSVG />
													{item === 'categories' && (
														<div className={styles.theadDropDown}>
															{categories.children?.map((item, index) => (
																<div onClick={() => handleSetCategory(item.title)} data-element={item} key={index}>
																	{item.title}
																</div>
															))}
														</div>
													)}
													{item === 'status' && (
														<div className={styles.theadDropDown}>
															{status &&
																status.map((item: string, index) => (
																	<div
																		onClick={() => {
																			if (item.toLowerCase() === 'draft') {
																				setSort({ sortBy: item.toLowerCase(), order: 'asc' })
																			} else {
																				setSort({ sortBy: item.toLowerCase(), order: 'desc' })
																			}
																		}}
																		key={index}
																		data-element={item}>
																		{item}
																	</div>
																))}
														</div>
													)}
												</div>
											)
										} else {
											return (
												<div data-element={item} className={styles.th} key={index} onClick={e => handleSetSort(e)}>
													{item} <ArrowDownSVG />
												</div>
											)
										}
									} else {
										return (
											<div className={styles.th} key={index}>
												{item}
											</div>
										)
									}
								})}
							</div>
						)}
					</div>
					<div className={styles.tbody}>
						{posts &&
							posts?.map((item: ExtendedArticleContentProps, index: number) => (
								<div key={index} className={`${styles.tr} ${item.status === 'draft' ? styles.draft : ''}`}>
									<div className={styles.td}>
										<AnchorLink className={styles.tabelTitle} href={`/blog/${item.seo?.slug.toLowerCase().replace(/\s+/g,'-')}?id=${item._id}`}>
											{item.title}
										</AnchorLink>
									</div>
									<div className={styles.td}>{item.author.name}</div>
									<div className={styles.td}>
										{item.categories.length > 1 ? item.categories.join(', ') : item.categories}
									</div>
									<div className={styles.td}>{new Date(item.createdAt).toLocaleDateString()}</div>
									<div className={`${styles.td} ${item.publishedAt ? '' : styles.publish}`}>
										{item.publishedAt ? (
											new Date(item.publishedAt).toLocaleDateString()
										) : (
											<p data-id={item._id} onClick={e => handlePublishPost(e)}>
												Publish
											</p>
										)}
									</div>
									<div className={styles.td}>{item.comments.length}</div>
									<div className={styles.td}>435</div>
									<div className={styles.td}>{item.status}</div>
									<div className={styles.td}>
										<AnchorLink href={`/admin/posts/editpost/?id=${item._id}`}>
											<PencilSVG />
										</AnchorLink>
										<div data-id={item._id} onClick={e => handleDeletePost(e)}>
											<TrashSVG />
										</div>
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
						<div className={styles.inputBox} onClick={() => handleOpenRows()}>
							<input className={styles.selectInput} value={rows} type="text" name="rows" readOnly />
							<ArrowDownSVG className={styles.arrowRows} />
						</div>
						<div ref={rowsRef} className={styles.rows}>
							{rowsNumbers.map((row, index) => (
								<span
									key={index}
									data-value={row}
									className={rows === row ? styles.activeRow : ''}
									onClick={e => handleSelectRows(e)}>
									{row}
								</span>
							))}
						</div>
					</div>
				</div>
				<span>
					{start}-{end} of {total}
				</span>
				<div className={styles.arrowsControls}>
					<button data-element="prev" className={styles.arrows} onClick={e => handleChangePage(e)}>
						<ArrowPrevSVG className={styles.arrowPrev} />
					</button>
					<button data-element="next" className={styles.arrows} onClick={e => handleChangePage(e)}>
						<ArrowNextSVG className={styles.arrowNext} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ListOfPosts
