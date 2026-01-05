import slugify from 'slugify'
import useResponsiveCloudinaryImage from '../../../hooks/useResponsiveCloudinaryImage'
import type { ArticleContentProps } from '../../../types/types'
import AnchorLink from '../AnchorLink/AnchorLink'

interface SliderListProps {
	styles: { [key: string]: string }
	data: ArticleContentProps
	index: number
	number: number
}

const SliderList = ({ styles, data, index, number }: SliderListProps) => {
	// const dynamicClass = styles[`sliderHero${index + 1}`]
	// ${dynamicClass} ${number === index ? styles.sliderActive : ''}

	const mainImageSrc = data.mainImage.src
	const responsiveImage = useResponsiveCloudinaryImage({ mainImageSrc })

	const categorySlugs = data.categories
		?.map(cat => cat)
		.filter(Boolean) // usuwa undefined/null
		.map(slug => slugify(slug, { lower: true, strict: true }))
	
	const url = `/${categorySlugs.join('/')}/${data.seo?.slug.toLowerCase().replace(/\s+/g, '-')}?id=${data._id}`

	const isActive = number === index
	return (
		<div className={styles.sliderList}>
			<div
				style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 999 : 998, left: `${index * -100}%` }}
				data-slick-index={index}
				className={`${styles.sliderHero}  `}>
				{/* <div className={styles.sliderHeroBg} style={{ backgroundImage: `url(${data.mainImage.src})` }}></div> */}
				<div className={styles.sliderHeroBg}>
					<img loading="lazy" src={responsiveImage} alt={data.mainImage.alt} />
				</div>
				<div className={`row ${styles.sliderContent} ${number === index ? styles.animated : ''}`}>
					<div className={styles.column}>
						<div className={styles.meta}>
							<span className={styles.categories}>
								{data.categories.map((item, index) => {
									return (
										<AnchorLink key={index} href={`/category/${item}`}>
											{item}
										</AnchorLink>
									)
								})}
							</span>
							<span className={styles.postedBy}>
								Posted by <span className={styles.author}>{data.author.name}</span>
							</span>
						</div>
						<h1 className={styles.text}>
							<AnchorLink href={url}>{data.title}</AnchorLink>
						</h1>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SliderList
