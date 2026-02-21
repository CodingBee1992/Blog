import { useState, type ReactNode } from 'react'
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'
import InputShowHideButton from '../InputShowHideButton/InputShowHideButton'
import useDateToDateTimeLocal from '../../../hooks/useDateTimeLocal'

interface RHFInputProps<T extends FieldValues> {
	children?: ReactNode
	name: Path<T>
	label?: string
	styles: Record<string, string>
	id: string
	type: 'text' | 'number' | 'password' | 'email' | 'date' | 'datetime-local'
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
	children,
}: RHFInputProps<T>) => {
	const { dateToDateTimeLocal } = useDateToDateTimeLocal()
	const [visible, setVisible] = useState<boolean>(false)
	const { control } = useFormContext()
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<div className={styles.formInputBox}>
					<label htmlFor={id}>{label && `${label}`}</label>
					<div className={styles.formInput}>
						<input
							id={id}
							value={type === 'datetime-local' ? dateToDateTimeLocal(value) : (value ?? '')}
							onChange={e => {
								const value = e.target.value
								
								if (type === 'number') {
									onChange(value === '' ? undefined : Number(value))
								} else if (type === 'datetime-local') {
									
									onChange(value ? new Date(value) : null)
								} else {
									onChange(value)
									
								}
							}}
							type={type === 'password' ? (visible === false ? type : 'text') : type}
							placeholder={placeholder}
							readOnly={isSubmitting}
							aria-readonly={isSubmitting}
							aria-invalid={!!error}
							aria-describedby={error ? `${id}-error` : undefined}
						/>
						{type === 'password' && (
							<InputShowHideButton visible={visible} isSubmitting={isSubmitting} onToggle={() => setVisible(v => !v)} />
						)}
					</div>
					{error && (
						<span id={`${id}-error`} className={styles.error}>
							{error.message}
						</span>
					)}
					{children}
				</div>
			)}
		/>
	)
}

export default RHFInput
