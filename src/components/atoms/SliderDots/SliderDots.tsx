import type { MouseEvent } from "react"

interface SliderDotsProps {
    styles:{[key:string]:string}
    number:number,
    index:number
	handleSwipeOnClickDots:(e:MouseEvent<HTMLElement>,index:number)=> void
}

const SliderDots = ({styles,number,index,handleSwipeOnClickDots}:SliderDotsProps) => {
	return (
		<li role="presentation" className={`${styles.dot} ${number === index ? styles.slickActive : ''} `} onClick={(e)=>handleSwipeOnClickDots(e,index)}>
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
