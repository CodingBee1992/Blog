interface cloudinaryProps {
	file: File | null
	uploadFolder?: string
	publicId?: string
	dataSignature: {
		signature: string
		timestamp: string
		api_key: string
	}
}

const uploadToCloudinary = async ({ file, dataSignature, publicId, uploadFolder }: cloudinaryProps) => {
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

	

	const response = await fetch(url, {
		method: 'POST',
		body: formData,
	})

	const data = await response.json()

	return data
}

export default uploadToCloudinary
