import  { type MouseEvent, type RefObject } from 'react'
import { ArrowDownSVG, ArrowNextSVG, ArrowPrevSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'

interface TabelPaginationProps {
	styles: Record<string, string>
	rows: number
	handleOpenRows: () => void
	rowsRef: RefObject<HTMLDivElement | null>
	rowsNumbers: number[]
	handleSelectRows: (e: MouseEvent<HTMLSpanElement>) => void
	start: number
	end: number
	total: number
	handleChangePage: (e: MouseEvent<HTMLButtonElement>) => void
}

const TabelPagination = ({
	styles,
	rows,
	handleOpenRows,
	rowsRef,
	rowsNumbers,
	handleSelectRows,
	start,
	end,
	total,
	handleChangePage,
}: TabelPaginationProps) => {
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
				<button data-element="prev" className={styles.arrows} onClick={e => handleChangePage(e)}>
					<ArrowPrevSVG className={styles.arrowPrev} />
				</button>
				<button data-element="next" className={styles.arrows} onClick={e => handleChangePage(e)}>
					<ArrowNextSVG className={styles.arrowNext} />
				</button>
			</div>
		</div>
	)
}

export default TabelPagination
