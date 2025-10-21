import Aos from 'aos'
import 'aos/dist/aos.css'
import { lazy, useEffect } from 'react'
import Loader from '../../components/atoms/loader/Loader'

import { Outlet, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import Footer from '../Footer/Footer'
import useWindowSize from '../../hooks/useWindowSize'

const Navigation = lazy(() => import('../Navigation/Navigation'))

const StaticLayout = () => {
	const { isLoading } = useSelector((state: RootState) => state.theme)
	const {width} = useWindowSize()
	const location = useLocation()
	useEffect(() => {
		if (!isLoading) {
			Aos.init({
				duration: 800,
				easing: 'ease-in-out',
				delay: 400,
			})
		}
	}, [isLoading])

	useEffect(() => {
		if (!isLoading) {
			Aos.refresh()
		}
	}, [location.pathname, isLoading,width])

	if (isLoading) {
		return <Loader />
	}

	return (
		<div data-aos="fade-zoom-in">
			<Navigation/>
			<div>
				<Outlet />
			</div>
			<Footer/>
		</div>
	)
}

export default StaticLayout
