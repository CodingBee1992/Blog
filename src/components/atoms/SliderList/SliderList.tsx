import type { PostDataProps } from '../../../types/types'

interface SliderListProps {
	styles: { [key: string]: string }
	data: PostDataProps
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
										<a key={index} href={item.href}>
											{item.category}
										</a>
									)
								})}
							</span>
							<span className={styles.postedBy}>
								Posted by <span className={styles.author}>{data.author}</span>
							</span>
						</div>
						<h1 className={styles.text}>
							<a href={data.href}>{data.title}</a>
						</h1>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SliderList
