import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const BASE_URL= import.meta.env.VITE_BASE_URL
const POSTS_URL = import.meta.env.VITE_POSTS_URL

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:`${BASE_URL}`,credentials:'include'}),
    endpoints: builder =>({

        fetchAllPosts:builder.query({
            query: ()=> `${POSTS_URL}`
        }),
        fetchPostsByLimit:builder.query({
            query: ({limit,page})=> `${POSTS_URL}/paginated/?limit=${limit}&page=${page}`
        }),
        fetchPostById:builder.query({
            query: (postId)=> `${POSTS_URL}/${postId}`
        }),

        createPost: builder.mutation({
            query:(updatedData)=>({
                url:`${POSTS_URL}`,
                method:"POST",
                headers:{'Content-type':'application/json'},
                body:updatedData
            })
        })
    })
})

export const {useFetchAllPostsQuery,useCreatePostMutation,useFetchPostByIdQuery,useFetchPostsByLimitQuery} = apiSlice