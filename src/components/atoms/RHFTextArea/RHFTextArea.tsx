import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'

interface RHFTextAreaProps<T extends FieldValues> {
	name: Path<T>
	label: string
   
}

const RHFTextArea = <T extends FieldValues>({ name, label }: RHFTextAreaProps<T>) => {
	const { control } = useFormContext()
	return (
		<Controller
			name={name}
			control={control}
			render={({field,fieldState:{error}}) => (
				<div>
					<label>
						{label}
						<textarea {...field}  />
					</label>
					{error && <span style={{ color: 'red' }}>{error.message}</span>}
				</div>
			)}
		/>
	)
}

export default RHFTextArea
