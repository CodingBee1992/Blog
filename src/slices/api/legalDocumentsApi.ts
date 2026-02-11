import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = import.meta.env.VITE_API_URL
const LEGAL_URL = import.meta.env.VITE_LEGAL_URL
export const legalApi = createApi({
	reducerPath: 'legal',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`,credentials:'include' }),
    tagTypes:['LEGAL'],
	endpoints: builder => ({
		createLegalDocuments: builder.mutation({
			query: ({ type, language, version, content }) => ({
				url: `${LEGAL_URL}/create`,
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: { type, language, version, content },
			}),
            invalidatesTags:()=>[{type:'LEGAL'}]
		}),
		fetchLegalDocuments: builder.query({
			query: ({ type }) => `${LEGAL_URL}/type?type=${type}`,
            providesTags:()=>[{type:'LEGAL'}]
		}),
		
	}),
})

export const { useCreateLegalDocumentsMutation, useFetchLegalDocumentsQuery } = legalApi
