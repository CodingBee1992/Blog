import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'

interface RHFAddFileProps<T extends FieldValues> {
	name: Path<T>
	label: string
	index?: number
}

const RHFAddFile = <T extends FieldValues>({ name, label }: RHFAddFileProps<T>) => {
	const { control } = useFormContext()

	// const srcError = get(errors, `${name}.src`)?.message
	// const altError = get(errors, `${name}.alt`)?.message
	// const captionError = get(errors, `${name}.caption`)?.message

	
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: {value, onChange }, fieldState: { error } }) => (
				<>
					<label>
						{label}
						<input
							onChange={e => {
								const file = e.target.files?.[0]

								onChange(file)
								
							}}
							type="file"
						/>
						{/* {srcError && <span>{srcError}</span>} */}
						{error && <span>{error.message}</span>}
						{value && (value as File)instanceof File && (
							<div>
								<img
									src={URL.createObjectURL(value)}
									
									style={{ width: 150, height: 150, marginTop: 10 }}
								/>
								
							</div>
						)}
						{/* <input
							onChange={e => {
								onChange({ ...value, alt: e.target.value })
								
							}}
							type="text"
							placeholder="Alt text"
						/>
						{altError && <span>{altError}</span>} */}

						{/* <input onChange={e =>{ 
							onChange({ ...value, caption: e.target.value })
							
							}} type="text" placeholder="Caption" />
						{captionError && <span>{captionError}</span>} */}
					</label>
				</>
			)}
		/>
	)
}

export default RHFAddFile
