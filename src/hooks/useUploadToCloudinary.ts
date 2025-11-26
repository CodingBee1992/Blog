const uploadToCloudinary = async (file: File | null) => {
	const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
	const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET

	if (!file) return
	const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`
	const formData = new FormData()
	formData.append('file', file)
	formData.append('upload_preset', UPLOAD_PRESET)

	const response = await fetch(url, {
		method: 'POST',
		body: formData,
	})

	const data = await response.json()

	return data.secure_url
}

export default uploadToCloudinary
