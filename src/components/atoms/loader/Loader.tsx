
import styles from './Loader.module.scss'


const Loader = () => {
	

	return (
		
		
			
				<div className={`${styles.loader}`} >
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
			
		
	)
}

export default Loader
