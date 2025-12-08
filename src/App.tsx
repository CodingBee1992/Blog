import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import { categories } from './containers/Navigation/dataNavigation/dataNavigation'

// Layouts
const StaticLayout = lazy(() => import('./containers/StaticLayout/StaticLayout'))
const AdminPanelLayout = lazy(() => import('./containers/StaticLayout/AdminPanelLayout'))
const SettingsLayout = lazy(() => import('./containers/StaticLayout/SettingsLayout'))

// Publis Sites
const HomePage = lazy(() => import('./components/pages/HomePage/HomePage'))
const StylesPage = lazy(() => import('./components/pages/StylesPage/StylesPage'))
const AboutPage = lazy(() => import('./components/pages/AboutPage/AboutPage'))
const ContactPage = lazy(() => import('./components/pages/ContactPage/ContactPage'))
const SinglePostPage = lazy(() => import('./components/pages/SinglePostPage/SinglePostPage'))
const SingleCategoryPage = lazy(() => import('./components/pages/CategoryPage/SingleCategoryPage'))

// User pages
const LoginPage = lazy(() => import('./components/pages/LoginPage/LoginPage'))
const RegistrationPage = lazy(() => import('./components/pages/RegistrationPage/RegistrationPage'))
const VerifyPage = lazy(() => import('./components/pages/VerifyPage/VerifyPage'))

// Admin pages
const AdminPanelPage = lazy(() => import('./components/pages/AdminPanel/AdminPanelPage/AdminPanelPage'))
const ListOfPostPage = lazy(() => import('./components/pages/AdminPanel/Posts/ListOfPostPage/ListOfPostPage'))
const AddPostPage = lazy(() => import('./components/pages/AdminPanel/Posts/AddPostPage/AddPostPage'))
const EditPostPage = lazy(() => import('./components/pages/AdminPanel/Posts/EditPostPage/EditPostPage'))
const CategoriesPage = lazy(() => import('./components/pages/AdminPanel/Posts/CategoriesPage/CategoriesPage'))
const TagsPage = lazy(() => import('./components/pages/AdminPanel/Posts/TagsPage/TagsPage'))
const ListPage = lazy(() => import('./components/pages/AdminPanel/Users/ListPage/ListPage'))
const AddUserPage = lazy(() => import('./components/pages/AdminPanel/Users/AddUserPage/AddUserPage'))
const RoleAndPermissionsPage = lazy(
	() => import('./components/pages/AdminPanel/Users/RoleAndPermissionsPage/RoleAndPermissionsPage')
)

// Settigns pages

//  import AdminPanelLayout from './containers/StaticLayout/AdminPanelLayout'
// import StaticLayout from './containers/StaticLayout/StaticLayout'
// import SettingsLayout from './containers/StaticLayout/SettingsLayout'

// import HomePage from './components/pages/HomePage/HomePage'
// import ListOfPostPage from './components/pages/AdminPanel/Posts/ListOfPostPage/ListOfPostPage'
// import StylesPage from './components/pages/StylesPage/StylesPage'
// import SingleCategoryPage from './components/pages/CategoryPage/SingleCategoryPage'
// import AboutPage from './components/pages/AboutPage/AboutPage'
// import ContactPage from './components/pages/ContactPage/ContactPage'
// import SinglePostPage from './components/pages/SinglePostPage/SinglePostPage'

// import LoginPage from './components/pages/LoginPage/LoginPage'
// import VerifyPage from './components/pages/VerifyPage/VerifyPage'
// import RegistrationPage from './components/pages/RegistrationPage/RegistrationPage'

// import AdminPanelPage from './components/pages/AdminPanel/AdminPanelPage/AdminPanelPage'
// import CategoriesPage from './components/pages/AdminPanel/Posts/CategoriesPage/CategoriesPage'
// import AddPostPage from './components/pages/AdminPanel/Posts/AddPostPage/AddPostPage'
// import EditPostPage from './components/pages/AdminPanel/Posts/EditPostPage/EditPostPage'
// import TagsPage from './components/pages/AdminPanel/Posts/TagsPage/TagsPage'
// import ListPage from './components/pages/AdminPanel/Users/ListPage/ListPage'
// import AddUserPage from './components/pages/AdminPanel/Users/AddUserPage/AddUserPage'
// import RoleAndPermissionsPage from './components/pages/AdminPanel/Users/RoleAndPermissionsPage/RoleAndPermissionsPage'

// Route Guards
import AdminRoute from './containers/StaticLayout/AdminRoute'
import UserRoute from './containers/StaticLayout/UserRoute'
const Loader = lazy(()=> import ( './components/atoms/loader/Loader'))
const App = () => {
	return (
		<Router basename="/">
			<Routes>
				{/* Public sites */}
				<Route
					element={
						<Suspense fallback={<Loader />}>
							<StaticLayout />
						</Suspense>
					}>
					<Route path="/" element={<HomePage />} />
					<Route path="categories/">
						{categories.children?.map((item, index) => (
							<Route
								key={index}
								path={`${item.href.toLowerCase()}`}
								element={<SingleCategoryPage name={item.title} />}
							/>
						))}
					</Route>
					<Route path="blog/:idSlug" element={<SinglePostPage />}></Route>
					<Route path="styles" element={<StylesPage />} />
					<Route path="about" element={<AboutPage />} />
					<Route path="contact" element={<ContactPage />} />
				</Route>
				{/* User Routes */}
				<Route
					element={
						<Suspense fallback={<Loader />}>
							<UserRoute />
						</Suspense>
					}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/registration" element={<RegistrationPage />} />
					<Route path="/verify" element={<VerifyPage />} />
				</Route>
				{/* Admin Panel */}
				<Route
					path="/admin"
					element={
						<AdminRoute>
							<Suspense fallback={<Loader />}>
								<AdminPanelLayout />
							</Suspense>
						</AdminRoute>
					}>
					<Route index element={<AdminPanelPage />} />
					<Route path="posts/">
						<Route path="listofposts" element={<ListOfPostPage />} />
						<Route path="addpost" element={<AddPostPage />} />
						<Route path="editpost" element={<EditPostPage />} />
						<Route path="categories" element={<CategoriesPage />} />
						<Route path="tags" element={<TagsPage />} />
					</Route>
					<Route path="users/">
						<Route path="list" element={<ListPage />} />
						<Route path="adduser" element={<AddUserPage />} />
						<Route path="permissions" element={<RoleAndPermissionsPage />} />
					</Route>
				</Route>
				{/* Settings */}
				<Route path="/settings" element={<SettingsLayout />}></Route>
				{/* 404 */}
				<Route path="*" element={<div>Page Not Found</div>} />
			</Routes>
		</Router>
	)
}

export default App
