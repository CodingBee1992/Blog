import type { MouseEvent, TouchEvent } from 'react'
import type { PostDataProps } from '../../../types/types'

interface SliderListProps {
	styles: { [key: string]: string }
	data: PostDataProps
	index: number
	number: number
	handleSliderOnMouseDown: (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => void
	handleSliderOnMouseUp: (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => void
}

const SliderList = ({
	styles,
	data,
	index,
	number,
	handleSliderOnMouseDown,
	handleSliderOnMouseUp,
}: SliderListProps) => {
	return (
		<div className={styles.sliderListContainer}>
			<div className={styles.sliderList}>
				<div
					data-slick-index={index}
					className={`${styles.sliderHero} ${number === index ? styles.sliderActive : ''} `}>
					<div
						className={styles.sliderHeroBg}
						style={{ backgroundImage: `url(${data.image})` }}
						onMouseDown={e => handleSliderOnMouseDown(e)}
						onMouseUp={e => handleSliderOnMouseUp(e)}
						onTouchStart={e => handleSliderOnMouseDown(e)}
						onTouchEnd={e => handleSliderOnMouseUp(e)}></div>
					<div></div>
				</div>
			</div>
		</div>
	)
}

export default SliderList
