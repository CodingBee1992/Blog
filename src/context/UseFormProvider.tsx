import type { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {defaultValues, postSchema, type postSchemaTypes } from '../types/formSchema'
import { zodResolver } from '@hookform/resolvers/zod'

const UseFormProvider = ({ children }: { children: ReactNode }) => {
	const methods = useForm<postSchemaTypes>({
		mode:'all',
		resolver: zodResolver(postSchema),
		defaultValues
	})

	return <FormProvider {...methods}>{children}</FormProvider>
}

export default UseFormProvider
