import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'

interface RHFInputProps<T extends FieldValues> {
	name: Path<T>
	label?: string
	styles: Record<string, string>
	id:string
}

const RHFInput = <T extends FieldValues>({ name, label, styles,id }: RHFInputProps<T>) => {
	const { control } = useFormContext()
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div className={styles.formInput}>
					<label htmlFor={id} >{label && `${label}`}</label>
					<input id={id} {...field} type="text" />
					{error && <span className={styles.error}>{error.message}</span>}
				</div>
			)}
		/>
	)
}

export default RHFInput
