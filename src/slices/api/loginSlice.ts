import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BASE_URL = import.meta.env.VITE_BASE_URL
const USERS_URL = import.meta.env.VITE_USERS_URL

export const loginSlice = createApi({
	reducerPath: 'login',
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	endpoints: builder => ({
		login: builder.mutation({
			query: credentials => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: credentials,
			}),
		}),

		createAccount: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/registration`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: data,
			}),
		}),
	}),
})

export const { useLoginMutation, useCreateAccountMutation } = loginSlice
