import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_URL = import.meta.env.VITE_API_URL
const EMAIL_URL = import.meta.env.VITE_EMAIL_URL

export const emailApi = createApi({
	reducerPath: 'email',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`, credentials: 'include' }),
	tagTypes: ['SMTP'],
	endpoints: builder => ({
		createSMTP: builder.mutation({
			query: smtp => ({
				url: `${EMAIL_URL}/smtp`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: { smtp },
			}),
			invalidatesTags: () => [{ type: 'SMTP' }],
		}),
		testSMTP: builder.mutation({
			query: to => ({
				url: `${EMAIL_URL}/test-smtp`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: { to },
			}),
		}),
		contactEmail: builder.mutation({
			query: ({ firstName, lastName, email, subject, message }) => ({
				url: `${EMAIL_URL}/contact`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: { firstName, lastName, email, subject, message },
			}),
		}),
		fetchSMTP: builder.query({
			query: () => `${EMAIL_URL}`,
			providesTags: () => [{ type: 'SMTP' }],
		}),
	}),
})

export const { useCreateSMTPMutation, useTestSMTPMutation, useContactEmailMutation, useFetchSMTPQuery } = emailApi
