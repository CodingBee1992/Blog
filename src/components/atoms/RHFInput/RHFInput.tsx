import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'

interface RHFInputProps<T extends FieldValues> {
	name: Path<T>
	label?: string
	styles: Record<string, string>
	id: string
	type: 'text' | 'number' | 'password' | 'email'
	placeholder?: string

	isSubmitting?: boolean
}

const RHFInput = <T extends FieldValues>({
	name,
	placeholder,
	label,
	styles,
	id,
	type = 'text',

	isSubmitting = false,
}: RHFInputProps<T>) => {
	const { control } = useFormContext()
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<div className={styles.formInput}>
					<label htmlFor={id}>{label && `${label}`}</label>
					<input
						value={value ?? ''}
						id={id}
						onChange={e => {
							const value = e.target.value

							if (type === 'number') {
								onChange(value === '' ? undefined : Number(value))
							} else {
								onChange(value)
							}
						}}
						type={type}
						placeholder={placeholder}
						readOnly={isSubmitting}
						aria-readonly={isSubmitting}
						aria-invalid={!!error}
						aria-describedby={error ? `${id}-error` : undefined}
					/>
					{error && (
						<span id={`${id}-error`} className={styles.error}>
							{error.message}
						</span>
					)}
				</div>
			)}
		/>
	)
}

export default RHFInput
