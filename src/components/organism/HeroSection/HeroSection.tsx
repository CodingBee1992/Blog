import { useState, type MouseEvent, type TouchEvent } from 'react'
import { ArrowNext, ArrowPrev } from '../../../assets/icons/arrows/Arrows'
import type { ArticleContentProps} from '../../../types/types'
import { socialData } from '../../../utils/socialData'
import SliderList from '../../atoms/SliderList/SliderList'
import SocialIcon from '../../atoms/SocialIcon/SocialIcon'
import styles from './HeroSection.module.scss'
import SliderDots from '../../atoms/SliderDots/SliderDots'
import { useFetchLimitPostsQuery } from '../../../slices/api/apiSlice'
import Loader from '../../atoms/loader/Loader'

const HeroSection = () => {
	const [number, setNumber] = useState<number>(0)
	const [swipeStartX, setSwipeStartX] = useState<number>(0)
	const limit = 3
	const {data,isFetching} = useFetchLimitPostsQuery({limit})
	

	
	
	const handleSliderNext = () => {
		setNumber(prev => (prev >= limit - 1 ? 0 : prev + 1))
	}
	const handleSliderPrev = () => {
		setNumber(prev => (prev <= 0 ? limit - 1 : prev - 1))
	}
	const getClientX = (e: MouseEvent | TouchEvent): number => {
		if ('touches' in e && e.touches.length > 0) {
			return e.touches[0].clientX
		}
		if ('changedTouches' in e && e.changedTouches.length > 0) {
			return e.changedTouches[0].clientX
		}
		if ('clientX' in e) {
			return e.clientX
		}
		return 0
	}

	const handleSwipeStart = (e: MouseEvent | TouchEvent) => {
		setSwipeStartX(getClientX(e))
	}

	const handleSwipeEnd = (e: MouseEvent | TouchEvent) => {
		const swipeEndX = getClientX(e)

		const diff = +swipeEndX.toFixed(0) - +swipeStartX.toFixed(0)

		if (diff > 150) {
			handleSliderPrev()
		} else if (diff < -150) {
			handleSliderNext()
		}

		setSwipeStartX(0)
	}
	const handleSwipeOnClickDots = (e: MouseEvent<HTMLElement>, index: number) => {
		const target = e.target as HTMLElement
		const tabIndex = target.tabIndex

		if (tabIndex === index) {
			setNumber(tabIndex)
		}
	}

	if(isFetching) return <Loader />

	return (
		<section id="hero" className={styles.homeContainer}>
			<div className={styles.sliderContainer}>
				<div
					className={styles.sliderListContainer}
					onMouseDown={e => handleSwipeStart(e)}
					onMouseUp={e => handleSwipeEnd(e)}
					onTouchStart={e => handleSwipeStart(e)}
					onTouchEnd={e => handleSwipeEnd(e)}>
					{data.posts.map((data: ArticleContentProps, index: number) => (
						<SliderList key={index} styles={styles} data={data} index={index} number={number} />
					))}
				</div>
				<ul className={styles.dots}>
					{Array.from({ length: limit }, (_, index) => {
						return (
							<SliderDots
								handleSwipeOnClickDots={handleSwipeOnClickDots}
								key={index}
								styles={styles}
								index={index}
								number={number}
							/>
						)
					})}
				</ul>
			</div>
			<div className={styles.socialContainer}>
				<p className={styles.socialText}>Follow</p>
				<span className={styles.lineThrough}></span>
				<ul className={styles.socialIcons}>
					{socialData.map(({ path, icon,ariaLabel }, index) => {
						return (
							<SocialIcon key={index} href={path} ariaLabel={ariaLabel} styles={styles}>
								{icon}
							</SocialIcon>
						)
					})}
				</ul>
			</div>
			<div className={styles.arrowsContainer}>
				<button type='button' aria-label="Previous slide" className={styles.arrowBtn} onClick={() => handleSliderPrev()}>
					<ArrowPrev />
				</button>
				<button type='button' aria-label="Next slide" className={styles.arrowBtn} onClick={() => handleSliderNext()}>
					<ArrowNext />
				</button>
			</div>
		</section>
	)
}

export default HeroSection
