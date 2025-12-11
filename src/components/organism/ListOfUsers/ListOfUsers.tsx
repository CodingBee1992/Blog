import {
	ArrowDownSVG,
	
	PencilSVG,
	TrashSVG,
} from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'

import type { UsersProps } from '../../../types/types'
import styles from './ListOfUsers.module.scss'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { useEffect, useRef, useState, type ChangeEvent, type MouseEvent } from 'react'

import useDebounce from '../../../hooks/useDebounce'

import { rowsNumbers, theadUsers } from '../../../utils/data'

import TabelPagination from '../../modules/TabelPagination/TabelPagination'
import TabelSearch from '../../modules/TabelSearch/TabelSearch'
import { useFetchUserByLimitQuery } from '../../../slices/api/loginSlice'
import timePass from '../../../hooks/timePass'

const ListOfUsers = () => {
	const rowsRef = useRef<HTMLDivElement | null>(null)
	const [rows, setRows] = useState<number>(10)
	const [currentPage, setCurrentPage] = useState<number>(1)
	
	const [sort, setSort] = useState({
		sortBy: '',
		order: '',
	})
	
	const [start, setStart] = useState<number>(0)
	const [end, setEnd] = useState<number>(0)
	const [inputValue, setInputValue] = useState<string>('')
	const search = useDebounce(inputValue, 500)
	const { data, refetch } = useFetchUserByLimitQuery({
		limit: rows,
		page: currentPage,
		search: search,
		sortBy: sort.sortBy,
		order: sort.order,
		
	})

	const { users = [], totalPages = 1, total = 1 } = data ?? {}

	useEffect(() => {
		refetch()
	}, [data, refetch])




	const handleSetInputValue = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement
		const value = target.value
		setInputValue(value)
	}

	

	const handleSetSort = (e: MouseEvent<HTMLDivElement>) => {
		const target = e.currentTarget as HTMLDivElement
		const el = target.dataset.element
		

		if (!el) return
		
		if (el === 'comments') {
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

	const handleDeleteUser = async (e: MouseEvent<HTMLDivElement>) => {
		const target = e.currentTarget as HTMLDivElement
		const userId = target.dataset.id
		console.log(userId)
		try {
			refetch()
		} catch (error) {
			console.log(error)
		}
	}

	// if (isFetching) return <Loader />
	return (
		<div className={styles.listWrapper}>
			<h3 className={styles.listTitle}>List</h3>
			<TabelSearch styles={styles} handleSetInputValue={handleSetInputValue} />

			<div className={styles.listContainer}>
				<div className={styles.tableContainer}>
					<div className={styles.thead}>
						<div className={styles.tr}>
							{theadUsers.map((item, index) => {
								if (item !== 'actions' && item !== 'role') {
									
										return (
											<div data-element={item} className={styles.th} key={index} onClick={e => handleSetSort(e)}>
												{item} <ArrowDownSVG />
											</div>
										)
									
								} else {
									return (
										<div className={styles.th} key={index}>
											{item}
										</div>
									)
								}
							})}
						</div>
					</div>
					<div className={styles.tbody}>
						{users &&
							users?.map((item: UsersProps, index: number) => (
								<div
									key={index}
									className={`${styles.tr} `}>
									<div className={styles.td}>
										<AnchorLink className={styles.tabelTitle} href={`admin/users/profile/${item._id}`}>
											{item.name}
											{timePass(item.createdAt,7) && <span className={styles.newUser}>New</span>}
										</AnchorLink>
									</div>

									<div className={styles.td}>{item.email}</div>
									<div className={styles.td}>{new Date(item.createdAt).toLocaleDateString()}</div>
									<div className={styles.td}>{item.isVerified.toString()}</div>

									<div className={styles.td}>{item.commentsCount}</div>
									<div className={styles.td}>{item.role}</div>
									<div className={styles.td}>
										
												<AnchorLink href={`/admin/users/profile/${item._id}`}>
													<PencilSVG />
												</AnchorLink>
												<div data-id={item._id} onClick={e => handleDeleteUser(e)}>
													<TrashSVG />
												</div>
											
										
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
			<TabelPagination
				styles={styles}
				rows={rows}
				rowsNumbers={rowsNumbers}
				start={start}
				end={end}
				rowsRef={rowsRef}
				total={total}
				handleOpenRows={handleOpenRows}
				handleSelectRows={handleSelectRows}
				handleChangePage={handleChangePage}
			/>
		</div>
	)
}

export default ListOfUsers
