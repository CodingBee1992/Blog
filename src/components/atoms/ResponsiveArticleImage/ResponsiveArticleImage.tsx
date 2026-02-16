import useResponsiveCloudinaryImage from '../../../hooks/useResponsiveCloudinaryImage'

interface ResponsiveImageProps {
	className?: string
	mainImageSrc: string
	imageAlt: string
	defaultWidth?: number
}

const ResponsiveArticleImage = ({ mainImageSrc, imageAlt, className, defaultWidth }: ResponsiveImageProps) => {
	const responsiveUrl = useResponsiveCloudinaryImage({ mainImageSrc, defaultWidth })

	return <img src={responsiveUrl} alt={imageAlt} className={className} />
}

export default ResponsiveArticleImage
