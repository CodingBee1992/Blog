import { BrowserRouter as Router, Route, Routes } from 'react-router'


import DesignPage from './components/pages/categories/DesignPage/DesignPage'
import LifeStylePage from './components/pages/categories/LifeStylePage/LifeStylePage'
import PhotographyPage from './components/pages/categories/PhotographyPage/PhotographyPage'
import VacationPage from './components/pages/categories/VacationPage/VacationPage'
import WorkPage from './components/pages/categories/WorkPage/WorkPage'
import HealthPage from './components/pages/categories/HealthPage/HealthPage'
import FamilyPage from './components/pages/categories/FamilyPage/FamilyPage'
import RealtionshipPage from './components/pages/categories/RelationshipPage/RealtionshipPage'
import AudioPostPage from './components/pages/Blog/AudioPostPage/AudioPostPage'
import VideoPostPage from './components/pages/Blog/VideoPostPage/VideoPostPage'
import StandardPostPage from './components/pages/Blog/StandardPostPage/StandardPostPage'
import StylesPage from './components/pages/StylesPage/StylesPage'
import AboutPage from './components/pages/AboutPage/AboutPage'
import ContactPage from './components/pages/ContactPage/ContactPage'
import StaticLayout from './containers/HomPage/StaticLayout'
import HomePage from './components/pages/HomePage/HomePage'

const App = () => {
	return (
		<Router basename="/">
			<Routes>
				<Route element={<StaticLayout/>}>
					<Route path="/" element={<HomePage />} />
					<Route path="categories/">
						<Route path="design" element={<DesignPage />} />
						<Route path="lifestyle" element={<LifeStylePage />} />
						<Route path="photography" element={<PhotographyPage />} />
						<Route path="vacation" element={<VacationPage />} />
						<Route path="work" element={<WorkPage />} />
						<Route path="health" element={<HealthPage />} />
						<Route path="family" element={<FamilyPage />} />
						<Route path="relationship" element={<RealtionshipPage />} />
					</Route>
					<Route path="blog/">
						<Route path="video-post" element={<VideoPostPage />} />
						<Route path="audio-post" element={<AudioPostPage />} />
						<Route path="standard-post" element={<StandardPostPage />} />
					</Route>
					<Route path="styles" element={<StylesPage />} />
					<Route path="about" element={<AboutPage />} />
					<Route path="contact" element={<ContactPage />} />
				</Route>
			</Routes>
		</Router>
	)
}

export default App
