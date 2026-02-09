import z from 'zod'

export const socialLinksSchema = z.object({
   
    facebook: z.string().trim().min(1, { message: 'Password is required' }),

    twitter: z.string().trim().min(1, { message: 'From name is required' }),
    instagram: z.string().trim().min(1, { message: 'From email is required' }),
    youTube: z.string().trim().min(1, { message: 'Reply to is required' }),
})
export type socialTypes = z.infer<typeof socialLinksSchema>

export const socialLinksDefaults: socialTypes = {
    facebook:'',
    twitter:'',
    instagram:'',
    youTube:''

}