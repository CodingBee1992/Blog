import z from 'zod'
export const postSchema = z.object({
	title: z.string().trim().min(1, { message: 'Please fill title' }),
	introduction: z.string().trim().min(1, { message: 'Please fill introduction' }),

	mainImage: z.object({
		src: z
			.instanceof(File).or(z.string())
			.nullable()
			.refine(v => v !== null, {
				message: 'Please upload a file',
			}),
		alt: z.string().trim().min(1, { message: 'Please fill alt' }),
		caption: z.string().trim().min(1, { message: 'Please fill caption' }),
		public_id: z.string(),
	}),

	articleContent: z.array(
		z.discriminatedUnion('type', [
			z.object({
				type: z.literal('title'),
				value: z.string().min(1, 'Please fill field'),
			}),
			z.object({
				type: z.literal('text'),
				value: z.string().min(1, 'Please fill field'),
			}),
			z.object({
				type: z.literal('completion'),
				value: z.string().min(1, 'Please fill field'),
			}),
			z.object({
				type: z.literal('callToAction'),
				value: z.string().min(1, 'Please fill field'),
			}),
			z.object({
				type: z.literal('image'),
				value: z.object({
					src: z
						.instanceof(File)
						.or(z.string())
						.nullable()
						.refine(v => v !== null, 'Please upload a file'),
					alt: z.string().min(1, 'Please fill alt'),
					caption: z.string().min(1, 'Please fill caption'),
					public_id: z.string(),
				}),
			}),
		])
	),

	categories: z.array(z.string()).min(1, { message: 'Min 1 Category' }).max(2, { message: 'Max 2 Categories' }),
	seo: z.object({
		slug: z.string().min(1, { message: 'Please fill field' }),
		metaTitle: z.string().min(1, { message: 'Please fill field' }),
		metaDescription: z.string().min(1, { message: 'Please fill field' }),
	}),
	status: z.string(),
})

export type postSchemaTypes = z.infer<typeof postSchema>

export const defaultValues: postSchemaTypes = {
	title: '',
	introduction: '',
	mainImage: {
		src: null,
		alt: '',
		caption: '',
		public_id: '',
	},
	articleContent: [
		{ type: 'title', value: '' },
		{ type: 'text', value: '' },
		{
			type: 'image',
			value: {
				src: null,
				alt: '',
				caption: '',
				public_id: '',
			},
		},
		{ type: 'completion', value: '' },
		{ type: 'callToAction', value: '' },
	],

	categories: [],
	seo: {
		slug: '',
		metaTitle: '',
		metaDescription: '',
	},
	status: 'draft',
}
