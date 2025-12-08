import useWindowSize from './useWindowSize'

interface ImageProps {
	mainImageSrc: string
	defaultWidth?: number
}

const useResponsiveCloudinaryImage = ({ mainImageSrc, defaultWidth }: ImageProps) => {
	const { width } = useWindowSize()

	let imageWidth
	if (width < 800) imageWidth = 800
	
	else imageWidth = width

	imageWidth = defaultWidth ? defaultWidth : imageWidth
	const imageHeight = Math.round((imageWidth * 3) / 4)

	try {
		const urlImage = new URL(mainImageSrc)
		const parts = urlImage.pathname.split('/upload/')

		return `${urlImage.origin}${parts[0]}/upload/f_webp,w_${imageWidth},h_${imageHeight},c_limit/${parts[1]}`
	} catch {
		return mainImageSrc
	}
}

export default useResponsiveCloudinaryImage
