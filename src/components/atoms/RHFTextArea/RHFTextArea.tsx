import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'

interface RHFTextAreaProps<T extends FieldValues> {
	name: Path<T>
	label: string
	styles: Record<string, string>
	id:string
}

const RHFTextArea = <T extends FieldValues>({ name, label, styles,id }: RHFTextAreaProps<T>) => {
	const { control } = useFormContext()
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div className={styles.textAreaContainer}>
					<label htmlFor={id}>{label}</label>
					<textarea id={id} {...field} />
					{error && <span className={styles.error}>{error.message}</span>}
				</div>
			)}
		/>
	)
}

export default RHFTextArea
