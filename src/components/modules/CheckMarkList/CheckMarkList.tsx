import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import CheckMark from '../../atoms/Checkmark/CheckMark'
import styles from './CheckMarkList.module.scss'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
interface CheckMarkListProps {
	data: string[]
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
							<ReactMarkdown remarkPlugins={[remarkGfm]}>{item}</ReactMarkdown>
								
							</span>
						</label>
					</li>
				)
			})}
		</ul>
	)
}

export default CheckMarkList
