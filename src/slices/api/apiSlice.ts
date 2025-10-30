import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const BASE_URL= import.meta.env.VITE_BASE_URL
const POSTS_URL = import.meta.env.VITE_POSTS_URL

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:`${BASE_URL}`}),
    endpoints: builder =>({

        getPost:builder.query({
            query: ()=> `${POSTS_URL}`
        }),


        createPost: builder.mutation({
            query:({newPost})=>({
                url:`${POSTS_URL}`,
                method:"POST",
                headers:{'Content-type':'application-json'},
                body:newPost
            })
        })
    })
})

export const {useGetPostQuery,useCreatePostMutation} =apiSlice