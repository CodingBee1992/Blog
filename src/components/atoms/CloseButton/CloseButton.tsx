
import CloseSvg from '../../../assets/icons/nav/CloseSvg'
// import styles from './CloseButton.module.scss'

interface HandleCloseProps{
  styles: {[key:string]:string},
  handleClose: () => void
}

const CloseButton = ({styles,handleClose}:HandleCloseProps) => {
  

 

  return (
    <button className={styles.close} onClick={()=>handleClose()}>
        <CloseSvg styles={styles}/>
    </button>
  )
}

export default CloseButton