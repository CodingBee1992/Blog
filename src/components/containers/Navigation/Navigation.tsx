import { NavLink } from 'react-router'
import styles from './Nav.module.scss'
import Logo from '../../atoms/logo/Logo'
import useWindowSize from '../../../hooks/useWindowSize'
import DesktopNav from './desktopNav/DesktopNav'
import { dataNavigation, type MenuTypes } from './dataNavigation/dataNavigation'

import { ImgArrow } from '../../../assets/icons/nav/IconSvg'

const Navigation = () => {

	const size = useWindowSize()
	

	const menuElement =(data:MenuTypes,id:number,key:number)=>{
		if(data.href === ''){
			return (
				<div key={key} data-element={id}>
					<span>{data.title}</span>
					{/* <FaArrowDown /> */}
					<ImgArrow styles={styles}/>
					{data.children?.length > 0 ? (
						<div>
							{data.children?.map((item:{title:string,href:string},index:number)=>{
								return menuElement(item,0,index)
							})}
						</div>
					): null}
				</div>
			)
		}else{
			return (
				<div>
					<a href={data.href}>{data.title}</a>
				</div>
			)
		}
	}

	return (
		<nav>
			<NavLink to={'/'} aria-label="codingBee-logo">
				<Logo />
			</NavLink>
			<DesktopNav size={size} dataMenu={dataNavigation} menuElement={menuElement}/>
		</nav>
	)
}

export default Navigation
