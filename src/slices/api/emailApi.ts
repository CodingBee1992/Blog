import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_URL
const EMAIL_URL = import.meta.env.VITE_EMAIL_URL

export const emailApi = createApi({
    reducerPath:'email',
    baseQuery:fetchBaseQuery({baseUrl:`${API_URL}`,credentials:'include'}),
    endpoints:builder =>({
        createSMTP:builder.mutation({
            query:(smtp)=>({
                url:`${EMAIL_URL}/smtp`,
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:{smtp}
            })
        }),
        testSMTP:builder.mutation({
            query:(to)=>({
                url:`${EMAIL_URL}/test-smtp`,
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:{to}
            })
        }),
        contactEmail:builder.mutation({
            query:({firstName,lastName,email,subject,message})=>({
                url:`${EMAIL_URL}/contact`,
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:{firstName,lastName,email,subject,message}
            })
        })
    })
})

export const {useCreateSMTPMutation,useTestSMTPMutation,useContactEmailMutation} = emailApi