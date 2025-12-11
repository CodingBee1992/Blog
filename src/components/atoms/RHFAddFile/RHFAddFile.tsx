import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'
import RHFInput from '../RHFInput/RHFInput'
import type { RefObject} from 'react'

interface RHFAddFileProps<T extends FieldValues> {
	name: Path<T>
	label: string
	styles: Record<string, string>
	fileRef: RefObject<(HTMLInputElement | null)[]>
	fileIndex:number
}

const RHFAddFile = <T extends FieldValues>({ name, label, styles, fileRef, fileIndex }: RHFAddFileProps<T>) => {
	const { control } = useFormContext()
	const randomIndex = Math.floor(Math.random() * 999)

	return (
		<Controller
			control={control}
			name={`${name}.src`}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<div className={styles.fileContainer}>
					<label htmlFor="file">{label}</label>
					{typeof value === 'string' ?  (
						<div className={styles.previewImage}>
							<img src={value} />
						</div>
					) :  (value as File) instanceof File && (
						<div className={styles.previewImage}>
							<img src={URL.createObjectURL(value)} />
						</div>
					)}
					<input
						ref={(el) =>{
							if(fileIndex === -1){
								fileRef.current[0] = el
							}else{
								fileRef.current[fileIndex] = el
							}
						}}
						id="file"
						className={styles.formInput}
						onChange={e => {
							const file = e.target.files?.[0]
							
							
							onChange(file)
						}}
						type="file"
					/>
					{error && <span className={`${styles.error} ${error ? styles.marginError : ''}`}>{error.message}</span>}
					<div className={styles.imageBox}>
						<RHFInput name={`${name}.alt`} label="Alt" styles={styles} id={`title-${randomIndex}`} />
						<RHFInput name={`${name}.caption`} label="Caption" styles={styles} id={`title-${randomIndex + 1}`} />
					</div>
				</div>
			)}
		/>
	)
}

export default RHFAddFile
