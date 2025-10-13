import { socialData } from '../../../utils/socialData'
import SocialIcon from '../../atoms/SocialIcon/SocialIcon'
import styles from './HeroSection.module.scss'

const HeroSection = () => {
	return (
		<section id="hero" className={styles.homeContainer}>
			<div className={styles.sliderContainer}></div>
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
			<div className={styles.arrowsContainer}></div>
		</section>
	)
}

export default HeroSection
