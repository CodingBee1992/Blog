import { Helmet } from 'react-helmet'
import MaintenancePageTemplate from '../../templates/MaintenancePageTemplate/MaintenancePageTemplate'

const MaintenancePage = () => {
	const currentUrl = import.meta.env.VITE_SITE_URL

	const seoOgImage = ''
	const seoDefaultLogo = ''

	return (
		<div>
			<Helmet>
				{/* Core SEO */}
				<title>Przerwa techniczna – wracamy wkrótce</title>
				<meta
					name="description"
					content="Strona jest chwilowo niedostępna z powodu prac technicznych. Wrócimy wkrótce."
				/>
				<meta name="robots" content="noindex, follow" />
				<link rel="canonical" href={`${currentUrl}/maintenance`} />

				{/* Favicon */}
				<link rel="icon" href={seoDefaultLogo} />
				<link rel="apple-touch-icon" href={seoDefaultLogo} />

				{/* Open Graph */}
				<meta property="og:title" content="Przerwa techniczna" />
				<meta property="og:description" content="Trwają prace techniczne. Zapraszamy wkrótce." />
				<meta property="og:image" content={seoOgImage} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={currentUrl} />

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Przerwa techniczna" />
				<meta name="twitter:description" content="Strona chwilowo niedostępna." />
				<meta name="twitter:image" content={seoOgImage} />

				{/* JSON-LD */}
				<script type="application/ld+json">
					{JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: 'Przerwa techniczna',
						description: 'Strona jest chwilowo niedostępna z powodu prac technicznych.',
						url: currentUrl,
					})}
				</script>
			</Helmet>
			<MaintenancePageTemplate />
		</div>
	)
}

export default MaintenancePage
