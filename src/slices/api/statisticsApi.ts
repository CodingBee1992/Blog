import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_URL
const STATISTICS_URL = import.meta.env.VITE_STATISTICS_URL 

export const statisticApi = createApi({
    reducerPath:'',
    baseQuery:fetchBaseQuery({baseUrl:`${API_URL}`}),
    endpoints: builder =>({
        fetchBasicStats: builder.query({
            query: ()=> `${STATISTICS_URL}`
        })
    })
})


export const {useFetchBasicStatsQuery} = statisticApi