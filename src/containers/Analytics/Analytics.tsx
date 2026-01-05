// Zamontować w App.tsx do zainicjalizowania śledzenia wyświetleń

import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { trackPageView } from '../../utils/gtag'
import Cookies from 'js-cookie'

const Analytics = () => {
	const location = useLocation()

	useEffect(() => {
		const consent = Cookies.get('isAnalyticCookieAccept') === 'true'

		if (consent) {
			trackPageView(location.pathname)
		}
	}, [location])
	return null
}

export default Analytics
