
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'

interface RHFSelectProps<T extends FieldValues> {
    name:Path<T>
    label:string
    options:string[]
}


const RHFSelect =<T extends FieldValues> ({name,label,options}:RHFSelectProps<T>) => {
    const {control}= useFormContext()
  return (
        <Controller 
            control={control}
            name={name}
            render={({field,fieldState:{error}})=>(
                <div >
                    <label>{label}:</label>
                    <select {...field}>
                        {options && options.map((option,index)=>(

                        <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    {error && <span>{error.message}</span>}
                </div>
            )}
        />
  )
}

export default RHFSelect