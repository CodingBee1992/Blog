import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'

interface RHFInputProps<T extends FieldValues> {
	name: Path<T>
	label?: string
}

const RHFInput = <T extends FieldValues>({ name, label }: RHFInputProps<T>) => {
	const { control } = useFormContext()
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div>
					<label>
						{label && `${label}:`}
						<input {...field} type="text" />
					</label>
					{error && <span>{error.message}</span>}
				</div>
			)}
		/>
	)
}

export default RHFInput
