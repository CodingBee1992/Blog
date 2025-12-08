import Seo from "../../../utils/seo"

const AboutPage = () => {
	return (
		<>
			<Seo
				title="About - [Company Name]"
				description="Kim jesteśmy i jak działamy? Sprawdź naszą misję, wizję oraz wartości, które kierują naszą pracą i współpracą z klientami."
				canonicalUrl={`${import.meta.env.VITE_SITE_URL}/contact`}
				type="website"
			/>
			<div>AboutPage</div>
		</>
	)
}

export default AboutPage
