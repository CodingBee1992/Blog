import styles from './Loader.module.scss'

const Loader = () => {
	return (
		<div className={`${styles.loaderContainer}`}>
			<div className={`${styles.loaderWrapper} ${styles.show} `}>
				<div className={styles.roller}>
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
	)
}

export default Loader
