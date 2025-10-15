import type { MouseEvent, TouchEvent } from 'react'
import type { PostDataProps } from '../../../types/types'

interface SliderListProps {
	styles: { [key: string]: string }
	data: PostDataProps
	index: number
	number: number
	handleSwipeStart: (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => void
	handleSwipeEnd: (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => void
}

const SliderList = ({ styles, data, index, number, handleSwipeStart, handleSwipeEnd }: SliderListProps) => {


	return (
		<div className={styles.sliderListContainer}>
			<div className={styles.sliderList}>
				<div
					data-slick-index={index}
					className={`${styles.sliderHero} ${number === index ? styles.sliderActive : ''} `}>
					<div
						className={styles.sliderHeroBg}
						style={{ backgroundImage: `url(${data.image})` }}
						onMouseDown={e => handleSwipeStart(e)}
						onMouseUp={e => handleSwipeEnd(e)}
						onTouchStart={e => handleSwipeStart(e)}
						onTouchEnd={e => handleSwipeEnd(e)}></div>
					<div className={`row ${styles.sliderContent}`}>
						<div className={styles.column}>
							<div className={styles.meta}>
								<span className={styles.categories}>
									{data.categories.map(item => {
										return <a href={item.href}>{item.category}</a>
									})}
								</span>
								<span className={styles.postedBy}>
									Posted by <span className={styles.author}>{data.author}</span>
								</span>
							</div>
							<h1 className={styles.text}><a href={data.href}>{data.title}</a></h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SliderList
