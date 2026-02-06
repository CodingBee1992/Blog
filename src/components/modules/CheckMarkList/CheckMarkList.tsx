import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import CheckMark from '../../atoms/Checkmark/CheckMark'
import styles from './CheckMarkList.module.scss'

interface CheckMarkListProps {
	data: {
		id: number
		info: string
		info2: string
	}[]
	setEnabledButton: Dispatch<SetStateAction<boolean>>
	confirmPassword: string
}

const CheckMarkList = ({ data, setEnabledButton, confirmPassword }: CheckMarkListProps) => {
	const [checked, setChecked] = useState<Set<number>>(new Set())

	useEffect(() => {
		if (confirmPassword.length > 1 && checked.size === data.length) {
			setEnabledButton(true)
		} else {
			setEnabledButton(false)
		}
	}, [checked.size, confirmPassword, data.length, setEnabledButton])

	const handleCheckMark = (id: number) => {
		// if (!checked.includes(id)) {
		// 	setChecked(prev => [...prev, id])

		// }else{
		// 	setChecked(prev => prev.filter(v => v !== id))
		// }
		setChecked(prev => {
			const next = new Set(prev)

			if (next.has(id)) {
				next.delete(id)
			} else {
				next.add(id)
			}

			return next
		})
	}

	return (
		<ul className={styles.acknowledgementsList}>
			{data.map((item, id) => {
				const isChecked = checked.has(id)

				return (
					<li key={id} className={styles.acknowledgement}>
						<label htmlFor={`checkbox-${id}`} className={styles.checkbox}>
							<input onChange={() => handleCheckMark(id)} checked={isChecked} type="checkbox" id={`checkbox-${id}`} />
							<CheckMark
								className={`${styles.checkmark} ${isChecked ? styles.scaleCheckmark : ''}`}
								isChecked={isChecked}
							/>
							<span className={styles.acknowledgementInfo}>
								<span className={styles.spanInfo1}>{item.info}</span>
								<span className={styles.spanInfo2}>{item.info2}</span>
							</span>
						</label>
					</li>
				)
			})}
		</ul>
	)
}

export default CheckMarkList
