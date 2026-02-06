import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_URL = import.meta.env.VITE_API_URL

const SIGNATURE_URL = import.meta.env.VITE_SIGNATURE_URL

export const cloudinaryApi = createApi({
	reducerPath: 'cloudinary',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
	endpoints: builder => ({
		createCloudinarySignature: builder.mutation({
			query: ({ uploadFolder, publicId }) => ({
				url: `${SIGNATURE_URL}/?uploadFolder=${uploadFolder}&publicId=${publicId}`,
				method: 'POST',
			}),
		}),
		destroyCloudinaryImage: builder.mutation({
			query: publicId => ({
				url: `${SIGNATURE_URL}/destroy/?publicId=${publicId}`,
				method: 'DELETE',
				headers: { 'Content-type': 'application/json' },
			}),
		}),
	}),
})

export const {useCreateCloudinarySignatureMutation,useDestroyCloudinaryImageMutation}=cloudinaryApi 