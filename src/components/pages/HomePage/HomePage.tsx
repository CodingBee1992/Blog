import Seo from '../../../utils/seo'
import HomePageTemplate from '../../templates/HomePageTemplate/HomePageTemplate'

const HomePage = () => {
	return (
		<>
			<Seo
				title='Home'
				description={`Posty i artykuły z kategorii Home`}
				canonicalUrl={`${import.meta.env.VITE_SITE_URL}`}
				type="website"
			/>
			<HomePageTemplate />
		</>
	)
}

export default HomePage
