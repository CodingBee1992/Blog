import Seo from '../../../utils/seo'
import ContactPageTemplate from '../../templates/ContactPageTemplate/ContactPageTemplate'

const ContactPage = () => {
	return (
		<>
			<Seo
				title="Contact - [Company Name]"
				description="Masz pytania? Skorzystaj z formularza kontaktowego lub zadzwoń. Jesteśmy do Twojej dyspozycji i chętnie pomożemy."
				canonicalUrl={`${import.meta.env.VITE_SITE_URL}/contact`}
        type='website'
			/>
			<ContactPageTemplate/>
		</>
	)
}

export default ContactPage
