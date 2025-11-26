import type { MouseEvent } from 'react'
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'

interface RHFCategorySelectProps<T extends FieldValues> {
	name: Path<T>

	options: string[]
	label: string
	max: number
	styles: Record<string, string>
}

const RHFCategorySelect = <T extends FieldValues>({ name, options, label, max, styles }: RHFCategorySelectProps<T>) => {
	const { control } = useFormContext<T>()

	const handleSelectCategory = (
		e: MouseEvent<HTMLLabelElement>,
		value: string[],
		onChange: (value: string[]) => void
	) => {
		e.preventDefault()
		const target = e.currentTarget as HTMLLabelElement
		const el = target.dataset.element
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

						{value.length > 0 &&<div className={styles.selectedCategories}>
							{value.map((v: string, index) => (
								<span key={index}>{v}</span>
							))}
						</div>}
						{error && <span className={styles.error}>{error.message}</span>}
					</div>
					<div className={styles.categoriesOptions}>
						{options.map((option: string, index) => {
							const disabled = value.length > 2 && !value.includes(option)
							const checked = value.includes(option)

							return (
								<label data-element={option} key={index} onClick={e => handleSelectCategory(e, value, onChange)}>
									<input value={option} type="checkbox" checked={checked} readOnly disabled={disabled} />
									{option}
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
