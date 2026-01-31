import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'
import RHFInput from '../RHFInput/RHFInput'
import type { RefObject } from 'react'

interface RHFAddFileProps<T extends FieldValues> {
	name: Path<T>
	label: string
	styles: Record<string, string>
	fileRef: RefObject<(HTMLInputElement | null)[]>
	fileIndex: number
	id: string
	isSubmitting?: boolean
}

const RHFAddFile = <T extends FieldValues>({
	name,
	id,
	label,
	styles,
	isSubmitting,
	fileRef,
	fileIndex,
}: RHFAddFileProps<T>) => {
	const { control } = useFormContext()
	const randomIndex = Math.floor(Math.random() * 999)

	return (
		<Controller
			control={control}
			name={`${name}.src`}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<div className={styles.fileContainer}>
					<label htmlFor={id}>{label}</label>
					{typeof value === 'string' ? (
						<div className={styles.previewImage}>
							<img src={value} alt='Preview image'/>
						</div>
					) : (
						(value as File) instanceof File && (
							<div className={styles.previewImage}>
								<img src={URL.createObjectURL(value)} alt='Preview image'/>
							</div>
						)
					)}
					<input
						ref={el => {
							if (fileIndex === -1) {
								fileRef.current[0] = el
							} else {
								fileRef.current[fileIndex] = el
							}
						}}
						id={id}
						className={styles.formInput}
						onChange={e => {
							const file = e.target.files?.[0]

							onChange(file)
						}}
						type="file"
						disabled={isSubmitting}
						aria-describedby={error ? `${id}-error` : undefined}
					/>
					{error && (
						<span id={`${id}-error`} className={`${styles.error} ${error ? styles.marginError : ''}`}>
							{error.message}
						</span>
					)}
					<div className={styles.imageBox}>
						<RHFInput
							name={`${name}.alt`}
							type="text"
							label="Alt"
							styles={styles}
							id={`title-${randomIndex}`}
							isSubmitting={isSubmitting}
						/>
						<RHFInput
							name={`${name}.caption`}
							type="text"
							label="Caption"
							styles={styles}
							id={`title-${randomIndex + 1}`}
							isSubmitting={isSubmitting}
						/>
					</div>
				</div>
			)}
		/>
	)
}

export default RHFAddFile
