import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BASE_URL = import.meta.env.VITE_BASE_URL
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL

export const loginSlice = createApi({
	reducerPath: 'login',
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	endpoints: builder => ({
		login: builder.mutation({
			query: credentials => ({
				url: `${LOGIN_URL}`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: credentials,
			}),
		}),
	}),
})

export const { useLoginMutation } = loginSlice
