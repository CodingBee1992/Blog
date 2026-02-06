

const getImageDimensions = (file: File): Promise<{ width: number; height: number }> =>
	new Promise((resolve, reject) => {
		const img = new Image()
		const objectUrl = URL.createObjectURL(file)

		img.onload = () => {
			resolve({ width: img.width, height: img.height })
			URL.revokeObjectURL(objectUrl)
		}

		img.onerror = reject
		img.src = objectUrl
	})

    export default getImageDimensions