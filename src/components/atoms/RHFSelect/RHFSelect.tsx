import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'

interface RHFSelectProps<T extends FieldValues> {
	name: Path<T>
	label: string
	options: string[]
	styles: Record<string, string>
}

const RHFSelect = <T extends FieldValues>({ name, label, options, styles }: RHFSelectProps<T>) => {
	const { control } = useFormContext()
	return (
		<Controller
			control={control}
			name={name}
            
			render={({ field, fieldState: { error } }) => (
				<div className={styles.statusContainer}>
					<label className={styles.statusTitle}>{label}:</label>
					<select {...field} className={styles.statusSelect} >
						<option hidden  selected>---select---</option>

						{options &&
							options.map((option, index) => (
								<option key={index} value={option}>
									{option}
								</option>
							))}
					</select>
					{error && <span className={styles.error}>{error.message}</span>}
				</div>
			)}
		/>
	)
}

export default RHFSelect
