import Aos from 'aos'
import 'aos/dist/aos.css'
import { lazy, useEffect } from 'react'
import Loader from '../../components/atoms/loader/Loader'

import { Outlet, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'

const Navigation = lazy(() => import('../Navigation/Navigation'))

const StaticLayout = () => {
	const { isLoading } = useSelector((state: RootState) => state.theme)

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
	}, [location.pathname, isLoading])

	if (isLoading) {
		return <Loader />
	}

	return (
		<div data-aos="fade-zoom-in">
			<Navigation/>
			<div>
				<Outlet />
			</div>
		</div>
	)
}

export default StaticLayout
