
import CloseSvg from '../../../assets/icons/nav/CloseSvg'
import styles from './CloseButton.module.scss'

interface HandleCloseProps{
  handleClose: () => void
}

const CloseButton = ({handleClose}:HandleCloseProps) => {
  

 

  return (
    <button className={styles.close} onClick={()=>handleClose()}>
        <CloseSvg styles={styles}/>
    </button>
  )
}

export default CloseButton