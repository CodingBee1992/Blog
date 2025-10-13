import { ArrowNext, ArrowPrev } from '../../../assets/icons/arrows/Arrows'
import { socialData } from '../../../utils/socialData'
import SocialIcon from '../../atoms/SocialIcon/SocialIcon'
import styles from './HeroSection.module.scss'

const HeroSection = () => {
	return (
		<section id="hero" className={styles.homeContainer}>
			<div className={styles.sliderContainer}>
				<div className={styles.sliderListContainer} draggable>
					<div className={styles.sliderList}>
						<div className={`${styles.sliderHero} ${styles.sliderFirst}`}>
							<div className={`${styles.sliderHeroBg} ${styles.sliderHeroFirst}`}></div>
							<div></div>
						</div>
						<div className={`${styles.sliderHero} ${styles.sliderSecond}`}>
							<div className={`${styles.sliderHeroBg} ${styles.sliderHeroSecond}`}></div>
							<div></div>
						</div>
						<div className={`${styles.sliderHero} ${styles.sliderThird}`}>
							<div className={`${styles.sliderHeroBg} ${styles.sliderHeroThird}`}></div>
							<div></div>
						</div>
					</div>
				</div>
				<ul className={styles.dots} role="tablist">
					<li role="presentation">
						<button type="button" role="tab" aria-controls="slick-slide-00" aria-label="1 of 3" tabIndex={0}>
							01
						</button>
					</li>
					<li role="presentation">
						<button type="button" role="tab" aria-controls="slick-slide-01" aria-label="2 of 3" tabIndex={-1}>
							02
						</button>
					</li>
					<li role="presentation">
						<button type="button" role="tab" aria-controls="slick-slide-02" aria-label="3 of 3" tabIndex={-1}>
							03
						</button>
					</li>
				</ul>
			</div>
			<div className={styles.socialContainer}>
				<p className={styles.socialText}>Follow</p>
				<span className={styles.lineThrough}></span>
				<ul className={styles.socialIcons}>
					{socialData.map(({ path, icon }) => {
						return (
							<SocialIcon href={path} styles={styles}>
								{icon}
							</SocialIcon>
						)
					})}
				</ul>
			</div>
			<div className={styles.arrowsContainer}>
				<button className={styles.arrowBtn}>
					<ArrowPrev />
				</button>
				<button className={styles.arrowBtn}>
					<ArrowNext />
				</button>
			</div>
		</section>
	)
}

export default HeroSection
