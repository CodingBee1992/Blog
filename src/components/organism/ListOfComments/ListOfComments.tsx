import { ArrowDownSVG, PencilSVG, TrashSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'

import type { CommentsProps } from '../../../types/types'
import styles from './ListOfComments.module.scss'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { useEffect, useRef, useState, type ChangeEvent, type MouseEvent } from 'react'

import useDebounce from '../../../hooks/useDebounce'

import { rowsNumbers, theadComments } from '../../../utils/data'

import TabelPagination from '../../modules/TabelPagination/TabelPagination'
import TabelSearch from '../../modules/TabelSearch/TabelSearch'

import timePass from '../../../hooks/timePass'
import Popup from '../../atoms/Popup/Popup'
import { useDeleteCommentMutation, useFetchAllCommentsQuery } from '../../../slices/api/commentsApi'
import NotificationNew from '../../atoms/NotificationNew/NotificationNew'
import handleCreateUrl from '../../../hooks/handleCreateUrl'
import longDateConverter from '../../../hooks/longDateConverter'

const ListOfComments = () => {
	const popupRef = useRef<HTMLDivElement | null>(null)
	const [popUpMessage, setPopUpMessage] = useState<string>('')
	const [userData, setUserData] = useState({
		commentId: '',
		commentContent: '',
		author: '',
		postId: '',
	})

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
	const [deleteComment] = useDeleteCommentMutation()

	const { data, refetch } = useFetchAllCommentsQuery({
		limit: rows,
		page: currentPage,
		search: search,
		sortBy: sort.sortBy,
		order: sort.order,
	})

	const { allcomments = [], totalPages = 1, total = 1 } = data ?? {}

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

	const handleOpenPopup = (e: MouseEvent<HTMLDivElement>) => {
		const target = e.currentTarget as HTMLDivElement

		const commentId = target.dataset.id
		const commentContent = target.dataset.content
		const author = target.dataset.author
		const postId = target.dataset.postid

		if (commentId && commentContent && author && postId)
			setUserData({
				commentId,
				commentContent,
				author,
				postId,
			})

		if (!popupRef.current?.classList.contains(styles.openPopup)) {
			popupRef.current?.classList.add(styles.openPopup)
		}
	}
	const handleClosePopup = () => {
		if (popupRef.current?.classList.contains(styles.openPopup)) {
			popupRef.current?.classList.remove(styles.openPopup)
		}
		setPopUpMessage('')
	}

	const handleDeleteComment = async () => {
		try {
			if (userData.commentId && userData.postId) {
				const res = await deleteComment({ commentId: userData.commentId, postId: userData.postId }).unwrap()
				console.log(res)
				setPopUpMessage(res.message)
			}

			refetch()
		} catch (error) {
			console.log(error)
		}
	}
	

	// if (isFetching) return <Loader />
	return (
		<div className={styles.listWrapper}>
			<h3 className={styles.listTitle}>List of Comments</h3>
			<TabelSearch styles={styles} handleSetInputValue={handleSetInputValue} />

			<div className={styles.listContainer}>
				<div className={styles.tableContainer}>
					<div className={styles.thead}>
						<div className={styles.tr}>
							{theadComments.map((item, index) => {
								if (item !== 'actions' && item !== 'content') {
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
						{allcomments &&
							allcomments?.map((item: CommentsProps, index: number) => (
								<div key={index} className={`${styles.tr} `}>
									<div className={styles.td}>
										<AnchorLink
											ariaLabel="Username"
											className={styles.tabelTitle}
											href={`admin/users/profile/${item.author._id}`}>
											{item.author.name}
											
										</AnchorLink>
									</div>

									<div className={styles.td}>
										<span className={styles.comment}>{item.comment}</span>{' '}
										{timePass(item.createdAt, 1) && <NotificationNew />}
									</div>

									<div className={styles.td}>
										<AnchorLink
											className={styles.tabelTitle}
											href={handleCreateUrl({ categories: item.categories, seo: item.seo, _id: item.postId })}>
											{item.title}
											
										</AnchorLink>
									</div>
									<div className={styles.td}>
										{new Date(item.createdAt).toLocaleString(...longDateConverter())}
									</div>

									<div className={styles.td}>
										<AnchorLink ariaLabel="Edit button" href={`/admin/users/profile/${item.author._id}`}>
											<PencilSVG />
										</AnchorLink>
										<div
											data-postid={item.postId}
											data-id={item._id}
											data-content={item.comment}
											data-author={item.author.name}
											onClick={e => handleOpenPopup(e)}>
											<TrashSVG />
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
			<TabelPagination
				rows={rows}
				rowsNumbers={rowsNumbers}
				start={start}
				end={end}
				total={total}
				setRows={setRows}
				handleChangePage={handleChangePage}
			/>
			<Popup
				popupRef={popupRef}
				popupTitle="DELETE comment"
				handleClosePopup={handleClosePopup}
				handleDelete={handleDeleteComment}
				popUpMessage={popUpMessage}>
				{!popUpMessage && (
					<div className={styles.popupInfo}>
						<span>
							<span>Comment Id:</span> {userData.commentId}
						</span>
						<span>
							<span>Author:</span> {userData.author}
						</span>
						<span>
							<span>Content:</span> {userData.commentContent}
						</span>
					</div>
				)}
			</Popup>
		</div>
	)
}

export default ListOfComments
