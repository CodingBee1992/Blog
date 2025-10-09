import { useDispatch } from 'react-redux'
import styles from './Logo.module.scss'
import { setIsLoading } from '../../../slices/themeSlice'
import type React from 'react'
import { useLocation, useNavigate } from 'react-router'

const Logo = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const handleClick = (e:React.MouseEvent<HTMLElement>)=>{
    e.preventDefault()

    const url = new URL(window.location.origin + '/')
    const path = url.pathname
    const search = url.search
    const hash = url.hash.replace('#','')

    if(location.pathname !== path || location.search !== search){
      setTimeout(()=>{
        navigate({pathname:path,search:search, hash: hash? `#${hash}`:undefined})
      },200)
      setTimeout(() => {
        window.scrollTo({top:0,behavior:'smooth'})
      }, 210);
    }



    dispatch(setIsLoading(true))
  }
	
  return (
		<a href="/" className={styles.logo} onClick={(e)=> handleClick(e)}>
			codingBee
		</a>
	)
}

export default Logo
