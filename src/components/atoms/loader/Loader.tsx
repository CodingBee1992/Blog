import { useEffect, useRef, useState } from 'react'
import styles from './Loader.module.scss'
import { has24HoursPassed } from '../../../utils/timePass'
interface LoaderProps {
	isLoading?: boolean
}
const Loader = ({ isLoading }: LoaderProps) => {
	const [isEnd, setIsEnd] = useState(false)
	const [isAnimationFinish, setIsAnimationFinish] = useState(false)
	const [isFirstTime] = useState(!localStorage.getItem('hasSeeAnim'))
	const [is24Hours] = useState(has24HoursPassed(localStorage.getItem('animSeenTime')))
	const loaderRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (isAnimationFinish && !isLoading) {
			loaderRef.current?.classList.add(styles.hide)
			setTimeout(() => {
				setIsEnd(true)
			}, 500)
		}
	}, [isAnimationFinish, isLoading])

	useEffect(() => {
		if (isFirstTime) {
			if (loaderRef?.current) {
				setTimeout(() => {
					const currentTime = new Date().getTime()
					localStorage.setItem('hasSeeAnim', 'true')
					localStorage.setItem('animSeenTime', currentTime.toString())
					setIsAnimationFinish(true)
				}, 2500)
			}
		} else if (is24Hours) {
			setTimeout(() => {
				const currentTime = new Date().getTime()
				localStorage.setItem('animSeenTime', currentTime.toString())
				setIsAnimationFinish(true)
			}, 200)
		} else {
			setTimeout(() => {
				setIsAnimationFinish(true)
			}, 50)
		}
	}, [is24Hours, isFirstTime])

	return (
		<>
			{isEnd ? null : isFirstTime ? (
				<div ref={loaderRef} className={`${styles.loader} ${styles.long}`}>
					<div className={styles.containerLogoAnim}>
						{/* <ImgLogoIcon /> */}
						{/* <ImgLogoName /> */}
						{/* <ImgLogoText /> */}
					</div>
				</div>
			) : is24Hours ? (
				<div ref={loaderRef} className={`${styles.loader}`}>
					<div className={styles.containerLogo}>
						{/* <ImgLogoIcon /> */}
						{/* <ImgLogoName /> */}
						{/* <ImgLogoText /> */}
					</div>
				</div>
			) : (
				<div ref={loaderRef} className={`${styles.loader}`} id={'loader'}>
					<div className={`${styles.wrapperMain} ${styles.in}`}>
						<div className={styles.ldsRoller}>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Loader
