import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_URL = import.meta.env.VITE_API_URL
const USERS_URL = import.meta.env.VITE_USERS_URL

export const loginSlice = createApi({
	reducerPath: 'login',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`,credentials:'include' }),
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
		verifyAccount: builder.query({
			query: (token) =>  `${USERS_URL}/verify?token=${token}`,
				
				
			
		}),
		resendVerification: builder.mutation({
			query: (email) =>  ({
				url: `${USERS_URL}/resend-verification?email=${email}`,
				method:"POST",
				headers:{'Content-type':'application/json'}
			}),
				
				
			
		}),
		logOut: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method:'POST',
				headers:{'Content-type':'application/json'}
			})
		}),
		fetchUserByLimit: builder.query({
			query:(params)=> {

				const queryString = new URLSearchParams(
					Object.fromEntries(Object.entries(params).map(([k,v])=> [k,String(v)]))
				)

				return `${USERS_URL}/get-users-by-limit/?${queryString}`
			}
		}),
		fetchAdminsAndModerators: builder.query({
			query:(params)=> {

				const queryString = new URLSearchParams(
					Object.fromEntries(Object.entries(params).map(([k,v])=> [k,String(v)]))
				)

				return `${USERS_URL}/get-admins-moderators/?${queryString}`
			}
		})
	}),
})

export const { useLoginMutation, useCreateAccountMutation,useLogOutMutation,useVerifyAccountQuery,useResendVerificationMutation,useFetchUserByLimitQuery,useFetchAdminsAndModeratorsQuery } = loginSlice
