
import type { ArticleContentProps } from '../../../types/types'
import AnchorLink from '../AnchorLink/AnchorLink'

interface SliderListProps {
	styles: { [key: string]: string }
	data: ArticleContentProps
	index: number
	number: number
}

const SliderList = ({ styles, data, index, number }: SliderListProps) => {
	const dynamicClass = styles[`sliderHero${index + 1}`]
	return (
		<div className={styles.sliderList}>
			<div
				data-slick-index={index}
				className={`${styles.sliderHero} ${dynamicClass} ${number === index ? styles.sliderActive : ''} `}>
				<div className={styles.sliderHeroBg} style={{ backgroundImage: `url(${data.image})` }}></div>
				<div className={`row ${styles.sliderContent} ${number === index ? styles.animated : ''}`}>
					<div className={styles.column}>
						<div className={styles.meta}>
							<span className={styles.categories}>
								{data.categories.map((item, index) => {
									return (
										<AnchorLink key={index} href={item.href}>
											{item.category}
										</AnchorLink>
									)
								})}
							</span>
							<span className={styles.postedBy}>
								Posted by <span className={styles.author}>{data.author.name}</span>
							</span>
						</div>
						<h1 className={styles.text}>
							<AnchorLink href={`${data.href}/?id=${data.id}`}>{data.title}</AnchorLink>
						</h1>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SliderList
