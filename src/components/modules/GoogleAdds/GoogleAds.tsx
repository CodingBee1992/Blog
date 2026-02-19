// import React, { useEffect } from 'react'
// interface GoogleAdProps {
// 	client: string // np. "ca-pub-XXXXXXXXXXXX"
// 	slot: string // unikalny slot reklamy np. "1234567890"
// 	style?: React.CSSProperties // opcjonalny styl np. szerokość/blok
// 	format?: string // np. "auto", "fluid"
// 	responsive?: boolean // true jeśli ma być responsive
// }
// const GoogleAds = ({
// 	client,
// 	slot,
// 	style = { display: 'block' },
// 	format = 'auto',
// 	responsive = true,
// }: GoogleAdProps) => {
// 	useEffect(() => {
// 		try {
// 			;(window.adsbygoogle = window.adsbygoogle || []).push({})
// 		} catch (err) {
// 			console.error('Google Ads error:', err)
// 		}
// 	}, [slot])

// 	return (
// 		<ins
// 			className="adsbygoogle"
// 			style={style}
// 			data-ad-client={client}
// 			data-ad-slot={slot}
// 			data-ad-format={format}
// 			data-full-width-responsive={responsive ? 'true' : 'false'}
// 		/>
// 	)
// }

// export default GoogleAds
