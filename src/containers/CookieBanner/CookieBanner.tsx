// Montujemy w App.tsx zeby sie odpaliła funkcja initGA do śledzenia wyświetleń stron a także do dalszych analiz
import styles from './CookieBanner.module.scss'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import CheckMark from '../../components/atoms/Checkmark/CheckMark'
import { initGA } from '../../utils/gtag'

declare global {
	interface Window {
		gtag: (command: string, eventName?: string, params?: Record<string, string | number | boolean | object>) => void
		loadGTM?: () => void
	}
}

export default function CookieBanner() {
	const [visible, setVisible] = useState(false)
	const [showAnim, setShowAnim] = useState(false)
	const [analytic, setAnalytic] = useState(false)
	const [marketing, setMarketing] = useState(false)

	useEffect(() => {
		const consent = Cookies.get('isBaseCookieAccept')
		if (!consent) {
			setVisible(true)
			setTimeout(() => setShowAnim(true), 500)
		} else {
			setShowAnim(false)
			setVisible(false)
		}
	}, [])
	useEffect(() => {
		const analytics = Cookies.get('isAnalyticCookieAccept') === 'true'
		const marketing = Cookies.get('isMarketingCookieAccept') === 'true'
		if (analytics) initGA()

		if (window.gtag) {
			window.gtag('consent', 'update', {
				analytics_storage: analytics ? 'granted' : 'denied',
				ad_storage: marketing ? 'granted' : 'denied',
				ad_user_data: marketing ? 'granted' : 'denied',
				ad_personalization: marketing ? 'granted' : 'denied',
			})
		}
	}, [])
	const hideBanner = () => {
		setShowAnim(false)
		setTimeout(() => setVisible(false), 500)
	}

	const updateConsent = (analytics: boolean, marketingConsent: boolean) => {
		if (window.gtag) {
			const consentObj: Record<string, 'granted' | 'denied'> = {
				ad_storage: marketingConsent ? 'granted' : 'denied',
				ad_personalization: marketingConsent ? 'granted' : 'denied',
				ad_user_data: marketingConsent ? 'granted' : 'denied',
				analytics_storage: analytics ? 'granted' : 'denied',
				functionality_storage: 'granted',
				personalization_storage: analytics || marketingConsent ? 'granted' : 'denied',
				security_storage: 'granted',
			}
			window.gtag('consent', 'update', consentObj)
		}

		Cookies.set('isBaseCookieAccept', 'true', { expires: 365, sameSite: 'Lax', secure: true })
		Cookies.set('isAnalyticCookieAccept', analytics ? 'true' : 'false', { expires: 365, sameSite: 'Lax', secure: true })
		Cookies.set('isMarketingCookieAccept', marketingConsent ? 'true' : 'false', {
			expires: 365,
			sameSite: 'Lax',
			secure: true,
		})

		hideBanner()

		if (typeof window.loadGTM === 'function') window.loadGTM()
	}

	if (!showAnim && !visible) return null
	return (
		<div
			id="bottomCookieContainer"
			className={`${styles.cookieBannerContainer} ${showAnim ? styles.animBanner : ''} ${
				visible ? styles.visibleBanner : ''
			}`}>
			<p>This website uses cookies for analytical and marketing purposes.</p>

			<div className={styles.cookieBannerButtons}>
				<button onClick={() => updateConsent(true, true)}>Accept all</button>
				<button onClick={() => updateConsent(analytic, marketing)}>Save selected</button>
				<button onClick={() => updateConsent(false, false)}>Reject all</button>
			</div>

			<div className={styles.checkmarks}>
				<label className={styles.checkbox}>
					<input type="checkbox" checked={analytic} onChange={e => setAnalytic(e.target.checked)} />
					<CheckMark className={`${styles.checkmark} ${analytic ? styles.scaleCheckmark : ''}`} isChecked={analytic} />
					Analytics
				</label>
				<label className={styles.checkbox}>
					<input type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)} />
					<CheckMark
						className={`${styles.checkmark} ${marketing ? styles.scaleCheckmark : ''}`}
						isChecked={marketing}
					/>
					Marketing
				</label>
			</div>
		</div>
	)
}
