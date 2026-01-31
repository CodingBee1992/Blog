import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const GENERAL_URL = import.meta.env.VITE_GENERAL_URL
const API_URL = import.meta.env.VITE_API_URL
export const generalApi = createApi({
	reducerPath: 'general',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`, credentials: 'include' }),
	endpoints: builder => ({
		generalSettings: builder.mutation({
			query: ({logo}) => ({
				url: `${GENERAL_URL}`,
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:{logo}
			}),
		}),
	}),
})

export const {useGeneralSettingsMutation} = generalApi