import { ArrowDownSVG, PencilSVG, TrashSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'

import type { UsersProps } from '../../../types/types'
import styles from './ListOfUsers.module.scss'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { useEffect, useRef, useState, type ChangeEvent, type MouseEvent } from 'react'

import useDebounce from '../../../hooks/useDebounce'

import { rowsNumbers, theadUsers } from '../../../utils/data'

import TabelPagination from '../../modules/TabelPagination/TabelPagination'
import TabelSearch from '../../modules/TabelSearch/TabelSearch'
import { useAdminDeleteUserMutation, useFetchUserByLimitQuery } from '../../../slices/api/userApi'
import timePass from '../../../hooks/timePass'
import Popup from '../../atoms/Popup/Popup'
import NotificationNew from '../../atoms/NotificationNew/NotificationNew'
import longDateConverter from '../../../hooks/longDateConverter'
import dateConverter from '../../../hooks/dateConverter'

const ListOfUsers = () => {
	const popupRef = useRef<HTMLDivElement | null>(null)
	const [popUpMessage, setPopUpMessage] = useState<string>('')
	const [userData, setUserData] = useState({
		userId: '',
		userName: '',
	})

	// const rowsRef = useRef<HTMLDivElement | null>(null)
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
	const [adminDeleteUser] = useAdminDeleteUserMutation()
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

		if (el === 'comments' || el === 'lastLogin') {
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
		const userId = target.dataset.id
		const userName = target.dataset.name
		if (userId && userName)
			setUserData({
				userId,
				userName,
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

	const handleDeleteUser = async () => {
		try {
			if (userData.userId) {
				const res = await adminDeleteUser(userData.userId)

				setPopUpMessage(res.data?.message)
			}

			refetch()
		} catch (error) {
			console.log(error)
		}
	}


	

	// if (isFetching) return <Loader />
	return (
		<div className={styles.listWrapper}>
			<h3 className={styles.listTitle}>List of Users</h3>
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
								<div key={index} className={`${styles.tr} `}>
									<div className={styles.td}>
										<AnchorLink
											ariaLabel="Username"
											className={styles.tabelTitle}
											href={`admin/users/profile/${item._id}`}>
											{item.name}
											{timePass(item.createdAt, 7) && <NotificationNew />}
										</AnchorLink>
									</div>

									<div className={styles.td}>{item.email}</div>
									<div className={styles.td}>{new Date(item.createdAt).toLocaleDateString(...dateConverter())}</div>
									<div className={styles.td}>{item.isVerified.toString()}</div>

									<div className={styles.td}>{item.commentsCount}</div>
									<div className={styles.td}>{item.role}</div>
									<div className={styles.td}>
										{!timePass(item.lastLogin, 7) ? (
											<span className={styles.inActiveUser}>In Active</span>
										) : (
											<span className={styles.activeUser}>Active</span>
										)}
									</div>
									<div className={styles.td}>{item.lastLogin ? new Date(item.lastLogin).toLocaleString(...longDateConverter()): '-'}</div>
									<div className={styles.td}>
										<AnchorLink ariaLabel="Edit button" href={`/admin/users/profile/${item._id}`}>
											<PencilSVG />
										</AnchorLink>
										<div data-id={item._id} data-name={item.name} onClick={e => handleOpenPopup(e)}>
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
				popupTitle="DELETE User"
				handleClosePopup={handleClosePopup}
				handleDelete={handleDeleteUser}
				popUpMessage={popUpMessage}>
				{!popUpMessage && (
					<div className={styles.popupInfo}>
						<span>
							<span>User Name:</span> {userData.userName}
						</span>
						<span>
							<span>User Id:</span> {userData.userId}
						</span>
					</div>
				)}
			</Popup>
		</div>
	)
}

export default ListOfUsers
