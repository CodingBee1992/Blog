import z from 'zod'

export const legalSchema = z.object({
	version: z.string().trim().min(1, { message: 'Field is required' }),
	language: z.string().trim().min(1, { message: 'Field is required' }),
	content: z.string().trim().min(1, { message: 'Field is required' }),
})

export type legalTypes = z.infer<typeof legalSchema>

export const legalDefaults: legalTypes = {
	version: '',
	language: '',
	content: '',
}
