import type { ChangeEvent, MouseEvent } from 'react'
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'
import type { CategoryProps } from '../../../types/types'

import CheckMark from '../Checkmark/CheckMark'

interface RHFCategorySelectProps<T extends FieldValues> {
	name: Path<T>

	options: CategoryProps[] | { name: string }[]
	label: string
	max: number
	styles: Record<string, string>
	isSubmitting?: boolean
}

const RHFCategorySelect = <T extends FieldValues>({
	name,
	options,
	label,
	max,
	styles,
	isSubmitting,
}: RHFCategorySelectProps<T>) => {
	const { control } = useFormContext<T>()

	const handleSelectCategory = (
		e: MouseEvent<HTMLLabelElement> | ChangeEvent<HTMLInputElement>,
		value: string[],
		onChange: (value: string[]) => void,
	) => {
		const target = e.target as HTMLLabelElement
		const el = target.id
		if (!el) return

		if (value.length > 0 && value.includes(el)) {
			onChange(value.filter(v => v !== el))
		} else if (value.length < max) {
			onChange([...value, el])
		}
	}

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value = [] as string[], onChange }, fieldState: { error } }) => (
				<div className={styles.categoriesContainer}>
					<div className={styles.selectedCategoriesContainer}>
						<span className={styles.selectedCategoriesTitle}>{label}:</span>

						{value.length > 0 && (
							<div className={styles.selectedCategories}>
								{value.map((v: string, index) => (
									<span key={index}>{v}</span>
								))}
							</div>
						)}
						{error && <span className={styles.error}>{error.message}</span>}
					</div>
					<div className={`${styles.categoriesOptions} ${value.length <= 0 ? styles.categoryMargin : ''}`}>
						{options.map((option, index) => {
							const disabled = value.length > 2 && !value.includes(option.name)
							const isChecked = value.includes(option.name)

							return (
								<label htmlFor={option.name} key={index} className={styles.checkbox}>
									<input
										id={option.name}
										value={option.name}
										type="checkbox"
										checked={isChecked}
										disabled={isSubmitting ? isSubmitting : disabled}
										onChange={e => handleSelectCategory(e, value, onChange)}
									/>

									<CheckMark
										className={`${styles.checkmark} ${isChecked ? styles.scaleCheckmark : ''}`}
										isChecked={isChecked}
									/>
									{option.name}
								</label>
							)
						})}
					</div>
				</div>
			)}
		/>
	)
}

export default RHFCategorySelect
