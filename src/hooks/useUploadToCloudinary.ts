import axios from 'axios'
interface cloudinaryProps {
	file: File | null
	uploadFolder?: string
	publicId?: string
	dataSignature: {
		signature: string
		timestamp: string
		api_key: string
	}
	onProgress?: (progress: number) => void
}

const uploadToCloudinary = async ({ file, dataSignature, publicId, uploadFolder, onProgress }: cloudinaryProps) => {
	const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
	const { timestamp, api_key, signature } = dataSignature

	if (!file) return
	const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`
	const formData = new FormData()
	formData.append('file', file)
	formData.append('signature', signature)
	formData.append('timestamp', timestamp.toString())

	formData.append('api_key', api_key)

	if (!publicId) {
		if (uploadFolder) {
			formData.append('folder', uploadFolder)
		}
	} else {
		formData.append('public_id', publicId)
		formData.append('overwrite', 'true')
		formData.append('invalidate', 'true')
	}

	const response = await axios.post(url, formData, {
		onUploadProgress: e => {
			if (onProgress) {
				const percent = Math.round((e.loaded * 100) / (e.total ?? 1))
				onProgress(percent)
			}
		},
	})

	const data = response.data

	return data
}

export default uploadToCloudinary
