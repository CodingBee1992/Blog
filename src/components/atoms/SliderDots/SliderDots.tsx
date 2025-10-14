interface SliderDotsProps {
    styles:{[key:string]:string}
    number:number,
    index:number
}

const SliderDots = ({styles,number,index}:SliderDotsProps) => {
	return (
		<li role="presentation" className={`${styles.dot} ${number === index ? styles.slickActive : ''} `}>
			<button
				type="button"
				className={styles.dotBtn}
				role="tab"
				aria-controls={`slick-slide-0${index}`}
				aria-label={`${index} of 3`}
				tabIndex={index}>
				{`0${index + 1}`}
			</button>
		</li>
	)
}

export default SliderDots
