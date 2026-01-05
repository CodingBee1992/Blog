import { useEffect, useRef, type Dispatch, type MouseEvent, type SetStateAction } from 'react'
import { ArrowDownSVG, ArrowNextSVG, ArrowPrevSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import styles from './TabelPagination.module.scss'
interface TabelPaginationProps {
	rows: number
	
	
	rowsNumbers: number[]
	
	start: number
	end: number
	total: number
	setRows:Dispatch<SetStateAction<number>>
	handleChangePage: (e: MouseEvent<HTMLButtonElement>) => void
}

const TabelPagination = ({
	rows,

	rowsNumbers,
	setRows,
	start,
	end,
	total,
	handleChangePage,
}: TabelPaginationProps) => {
	const rowsRef = useRef<HTMLDivElement | null>(null)
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

	return (
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
				<button
					data-element="prev"
					aria-label="previous page"
					className={styles.arrows}
					onClick={e => handleChangePage(e)}>
					<ArrowPrevSVG className={styles.arrowPrev} />
				</button>
				<button data-element="next" aria-label="next page" className={styles.arrows} onClick={e => handleChangePage(e)}>
					<ArrowNextSVG className={styles.arrowNext} />
				</button>
			</div>
		</div>
	)
}

export default TabelPagination
