import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:'API'}),
    endpoints: builder =>({

        getPost:builder.query({
            query: ()=> '/posts'
        }),


        createPost: builder.mutation({
            query:({id,newPost})=>({
                url:`/posts/${id}`,
                method:"POST",
                headers:{'Content-type':'application-json'},
                body:newPost
            })
        })
    })
})

export const {useGetPostQuery,useCreatePostMutation} =apiSlice