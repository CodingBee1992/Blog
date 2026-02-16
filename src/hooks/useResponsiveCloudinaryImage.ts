import useWindowSize from './useWindowSize'

interface ImageProps {
	mainImageSrc: string
	defaultWidth?: number
}

const useResponsiveCloudinaryImage = ({ mainImageSrc, defaultWidth }: ImageProps) => {
	const { width} = useWindowSize()

	let imageWidth
	if (width < 800) imageWidth = 800
	else imageWidth = width

	imageWidth = defaultWidth ? defaultWidth : width
	
	try {
		const urlImage = new URL(mainImageSrc)
		const parts = urlImage.pathname.split('/upload/')

		return `${urlImage.origin}${parts[0]}/upload/f_auto,w_${imageWidth},c_limit/${parts[1]}`
	} catch {
		return mainImageSrc
	}
}

export default useResponsiveCloudinaryImage
