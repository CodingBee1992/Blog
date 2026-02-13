import styles from './CookieBanner.module.scss'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import useMenuContext from '../../hooks/useMenuContext'

declare global {
	interface Window {
		gtag: (command: string, eventName?: string, params?: Record<string, string | number | boolean | object>) => void
		loadGTM?: () => void
	}
}

export default function CookieBanner() {
	const [visible, setVisible] = useState(false)
	const [showAnim, setShowAnim] = useState(false)
	const {analytics} = useMenuContext()
	useEffect(() => {
		const consent = Cookies.get('consent-stat') === 'true'
		if (!consent) {
			setVisible(true)
			setTimeout(() => setShowAnim(true), 500)
		} else {
			setShowAnim(false)
			setVisible(false)
		}
	}, [])

	const hideBanner = () => {
		const consent = localStorage.getItem('consent-stat') === 'true'

		if (!consent) Cookies.set('consent-stat', 'true',{expires:365})
		setShowAnim(false)
		setTimeout(() => setVisible(false), 500)
	}

	if(analytics && !analytics.analyticsEnabled) return null
	if (!showAnim && !visible) return null
	return (
		<div
			id="bottomCookieContainer"
			className={`${styles.cookieBannerContainer} ${showAnim ? styles.animBanner : ''} ${
				visible ? styles.visibleBanner : ''
			}`}>
			<p>This website uses cookies for analytical purposes.</p>

			<div className={styles.cookieBannerButtons}>
				<button onClick={() => hideBanner()}>I understand</button>
			</div>
		</div>
	)
}
