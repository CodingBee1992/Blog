import z from 'zod'

export const smtpSchema = z.object({
	provider: z.string().trim().min(1, { message: 'SMTP provider is required' }),

	host: z.string().trim().min(1, { message: 'Host is required' }),

	port: z
		.number({
			message: 'Port is required',
		})
		.int('Port must be an integer')
		.min(1, 'Port must be greater than 0')
		.max(65535, 'Port must be less than 65536'),

	secure: z.boolean(),

	user: z.email('User must be a valid email'),

	password: z.string().trim().min(1, { message: 'Password is required' }),

	fromName: z.string().trim().min(1, { message: 'From name is required' }),
	fromEmail: z.string().trim().min(1, { message: 'From email is required' }),
	replyTo: z.string().trim().min(1, { message: 'Reply to is required' }),
})
export type smtpTypes = z.infer<typeof smtpSchema>

export const smtpDefaults: smtpTypes = {
	provider: '',
	host: '',
	port: 0,
	secure: false,
	user: '',
	password: '',
	fromName: '',
	fromEmail: '',
	replyTo: '',
}
