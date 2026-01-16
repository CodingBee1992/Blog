// Funkcje pomocnicze do śledzenia ruchu na stronach

declare global {
	interface Window {
		gtag: (command: string, eventName?: string, params?: Record<string, string | number | boolean | object>) => void
		loadGTM?: () => void
		gaLoaded?: boolean
		dataLayer?: Array<Record<string, string | number | boolean | object>>
	}
}

// główna funkcja inicjalizująca GA4 i Consent Mode
export const initGA = () => {
	if (window.gaLoaded) return
	window.gaLoaded = true

	// dodanie skryptu GA4
	const script = document.createElement('script')
	script.async = true
	script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'
	document.head.appendChild(script)

	// inicjalizacja dataLayer i gtag
	window.dataLayer = window.dataLayer || []
	window.gtag =
		window.gtag ||
		function (command: string, eventName?: string, params?: Record<string, string | number | boolean | object>) {
			const payload: Record<string, string | number | boolean | object> = { command }

			// dodajemy eventName tylko jeśli istnieje
			if (eventName !== undefined) {
				payload['event_name'] = eventName
			}

			// scalamy params tylko jeśli istnieją
			if (params) {
				Object.assign(payload, params)
			}

			window.dataLayer!.push(payload)
		}

	// inicjalizacja gtag
	window.gtag('js', undefined, { date: new Date() })
	window.gtag('config', 'G-XXXXXXXXXX', {
		send_page_view: false,
		anonymize_ip: true,
	})
}

// główna funkcja inicjalizująca śledzenie
export const trackPageView = (path: string) => {
	if (!window.gtag) return
	window.gtag('event', 'page_view', {
		page_path: path,
		page_location: window.location.href,
		page_title: document.title,
	})
}

// funkcja inicjalizująca procent przeczytania posta
export const trackScroll = (percent: number) => {
	if (!window.gtag) return
	window.gtag('event', 'scroll', { percent })
}

// funkcja licząca czas spędzony na stronie
export const trackTimeSpent = (timeSpent: number) => {
	if (!window.gtag) return

	window.gtag('event', 'time_spent', {
		event_category: 'Engagement',
		event_label: 'Page Time',
		value: timeSpent, // czas spędzony na stronie w sekundach
	})
}
