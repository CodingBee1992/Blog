
import CloseSvg from '../../../assets/icons/nav/CloseSvg'
import useMenuContext from '../../../hooks/useMenuContext'
// import styles from './CloseButton.module.scss'

interface HandleCloseProps{
  styles: {[key:string]:string},
 
}

const CloseButton = ({styles}:HandleCloseProps) => {
  const {handleOpenCloseMenu,mobileRef} = useMenuContext()
  
 

  return (
    <button className={styles.close} onClick={()=>handleOpenCloseMenu({mobileRef})}>
        <CloseSvg styles={styles}/>
    </button>
  )
}

export default CloseButton