import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BASE_URL = import.meta.env.VITE_BASE_URL
const USERS_URL = import.meta.env.VITE_USERS_URL

export const loginSlice = createApi({
	reducerPath: 'login',
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}`,credentials:'include' }),
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
		logOut: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method:'POST',
				headers:{'Content-type':'application/json'}
			})
		})
	}),
})

export const { useLoginMutation, useCreateAccountMutation,useLogOutMutation } = loginSlice
