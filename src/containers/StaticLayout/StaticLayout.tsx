import Aos from 'aos'
import 'aos/dist/aos.css'
import { lazy, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import Footer from '../Footer/Footer'
import useWindowSize from '../../hooks/useWindowSize'
import { SinglePostProvider } from '../../context/createPostContext'
import { MenuProvider } from '../../context/menuContext'
import CookieBanner from '../CookieBanner/CookieBanner'
import { useIncrementPageViewsMutation } from '../../slices/api/statisticsApi'
// import Cookies from 'js-cookie'
const Navigation = lazy(() => import('../Navigation/Navigation'))

const StaticLayout = () => {
	const { isLoading } = useSelector((state: RootState) => state.theme)
	const { width } = useWindowSize()
	const { pathname } = useLocation()
	const [incrementPageViews] = useIncrementPageViewsMutation()

	useEffect(() => {
		incrementPageViews({})
	}, [incrementPageViews, pathname])

	// Unikalne wejscia na strone w ciągu danego dnia

	// const today = new Date().toISOString().slice(0, 10)
	// const path = encodeURIComponent(pathname)
	// const handleIncrementPageViews = useCallback(async () => {
	// 	try {
	// 		localStorage.setItem(path, JSON.stringify({ day: today }))
	// 		await incrementPageViews({})
	// 	} catch (err) {
	// 		console.error('Failed to count page view', err)
	// 	}
	// }, [incrementPageViews, today])

	// useEffect(() => {
	// 	const raw = localStorage.getItem(path)
	// const consent = Cookies.get('consent-stat') === 'true'
	// if(!consent) return
	// 	if (raw) {
	// 		try {
	// 			const stored = JSON.parse(raw)

	// 			if ( stored.day === today) return
	// 		} catch {
	// 			localStorage.removeItem(path)
	// 		}
	// 	}



	// 	handleIncrementPageViews()
	// }, [handleIncrementPageViews, pathname])

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
	}, [pathname, isLoading, width])

	// if (isLoading) {
	// 	return <Loader />
	// }

	return (
		<MenuProvider>
			<SinglePostProvider>
				<CookieBanner />
				<div data-aos="fade-zoom-in">
					<Navigation />
					<main>
						<Outlet />
					</main>
					<Footer />
				</div>
			</SinglePostProvider>
		</MenuProvider>
	)
}

export default StaticLayout
