import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'

interface RHFSelectProps<T extends FieldValues> {
	name: Path<T>
	label: string
	options: string[]
	styles: Record<string, string>
	isSubmitting?: boolean
	id?:string
}

const RHFSelect = <T extends FieldValues>({ name, label,id, options, styles, isSubmitting = false }: RHFSelectProps<T>) => {
	const { control } = useFormContext()
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value }, fieldState: { error } }) => {
				
				return (
					<div className={styles.selectContainer}>
						<label htmlFor={id}  className={styles.selectTitle}>{label}</label>
						<select
							onChange={e => {
								const target = e.target.value

								if (target === 'true') onChange(true)
								if (target === 'false') onChange(false)
							}}
							className={styles.selectOption}
							value={value ?? ''}
							disabled={isSubmitting}
							aria-disabled={isSubmitting}
							id={id}
							>
							

							{options &&
								options.map((option, index) => (
									<option key={index} value={option}>
										{option}
									</option>
								))}
						</select>
						{error && <span className={styles.error}>{error.message}</span>}
					</div>
				)
			}}
		/>
	)
}

export default RHFSelect
