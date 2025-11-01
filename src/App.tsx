import { BrowserRouter as Router, Route, Routes } from 'react-router'

import LifeStylePage from './components/pages/categories/LifeStylePage/LifeStylePage'
import PhotographyPage from './components/pages/categories/PhotographyPage/PhotographyPage'
import VacationPage from './components/pages/categories/VacationPage/VacationPage'
import WorkPage from './components/pages/categories/WorkPage/WorkPage'
import HealthPage from './components/pages/categories/HealthPage/HealthPage'
import FamilyPage from './components/pages/categories/FamilyPage/FamilyPage'
import RealtionshipPage from './components/pages/categories/RelationshipPage/RealtionshipPage'

import StylesPage from './components/pages/StylesPage/StylesPage'
import AboutPage from './components/pages/AboutPage/AboutPage'
import ContactPage from './components/pages/ContactPage/ContactPage'
import StaticLayout from './containers/StaticLayout/StaticLayout'
import HomePage from './components/pages/HomePage/HomePage'
import SinglePostPage from './components/pages/SinglePostPage/SinglePostPage'
import TravelPage from './components/pages/categories/TravelPage/TravelPage'
import NaturePage from './components/pages/categories/NaturePage/NaturePage'
import CulturePage from './components/pages/categories/CulturePage/CulturePage'
import LoginPage from './components/pages/LoginPage/LoginPage'
import RegistrationPage from './components/pages/RegistrationPage/RegistrationPage'

const App = () => {
	return (
		<Router basename="/">
			<Routes>
				<Route element={<StaticLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="categories/">
						<Route path="lifestyle" element={<LifeStylePage />} />
						<Route path="culture" element={<CulturePage />} />
						<Route path="travel" element={<TravelPage />} />
						<Route path="nature" element={<NaturePage />} />
						<Route path="photography" element={<PhotographyPage />} />
						<Route path="vacation" element={<VacationPage />} />
						<Route path="work" element={<WorkPage />} />
						<Route path="health" element={<HealthPage />} />
						<Route path="family" element={<FamilyPage />} />
						<Route path="relationship" element={<RealtionshipPage />} />
					</Route>
					<Route path="blog/" element={<SinglePostPage />}></Route>
					<Route path="styles" element={<StylesPage />} />
					<Route path="about" element={<AboutPage />} />
					<Route path="contact" element={<ContactPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/registration" element={<RegistrationPage />} />
			</Routes>
		</Router>
	)
}

export default App
