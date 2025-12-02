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
	
	return (
		<div className={styles.sliderList}>
			<div
				style={number === index ? { left: `${index * -100}%`, opacity: 1, zIndex: 999 } : { opacity: 0, zIndex: 998 }}
				data-slick-index={index}
				className={`${styles.sliderHero}  `}>
				<div className={styles.sliderHeroBg} style={{ backgroundImage: `url(${data.mainImage.src})` }}></div>
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
							<AnchorLink href={`/blog/?id=${data.id}`}>{data.title}</AnchorLink>
						</h1>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SliderList
