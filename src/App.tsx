import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'

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
const AdminRoomPage = lazy(() => import('./components/pages/AdminPanel/AdminPanelPage/AdminRoomPage/AdminRoomPage'))
const ListOfPostPage = lazy(() => import('./components/pages/AdminPanel/Posts/ListOfPostPage/ListOfPostPage'))
const AddPostPage = lazy(() => import('./components/pages/AdminPanel/Posts/AddPostPage/AddPostPage'))
const EditPostPage = lazy(() => import('./components/pages/AdminPanel/Posts/EditPostPage/EditPostPage'))
const CategoriesPage = lazy(() => import('./components/pages/AdminPanel/Posts/CategoriesPage/CategoriesPage'))
const PostHistory = lazy(() => import('./components/pages/AdminPanel/Posts/PostHistory/PostHistory'))
const ListPage = lazy(() => import('./components/pages/AdminPanel/Users/ListPage/ListPage'))
const AddUserPage = lazy(() => import('./components/pages/AdminPanel/Users/AddUserPage/AddUserPage'))
const RoleAndPermissionsPage = lazy(
	() => import('./components/pages/AdminPanel/Users/RoleAndPermissionsPage/RoleAndPermissionsPage')
)

// Settigns pages

// Route Guards
import AdminRoute from './containers/StaticLayout/AdminRoute'
import UserRoute from './containers/StaticLayout/UserRoute'
import ProfilePage from './components/pages/AdminPanel/Users/ProfilePage/ProfilePage'
import ListOfCommentsPage from './components/pages/AdminPanel/CommentsPage/ListOfComments/ListOfCommentsPage'
import CommentsSettingsPage from './components/pages/AdminPanel/CommentsPage/CommentsSettingsPage/CommentsSettingsPage'
import { defaultCategories } from './containers/Navigation/dataNavigation/dataNavigation'
import { useFetchAllCategoriesQuery } from './slices/api/categoriesApi'
import PageNotFound from './components/pages/PageNotFound/PageNotFound'
import SettingsPage from './components/pages/SettingsPages/SettingsPage/SettingsPage'

const Loader = lazy(() => import('./components/atoms/loader/Loader'))
const App = () => {
	const { data } = useFetchAllCategoriesQuery()

	const menuCategories = data && data.length > 0 ? data : defaultCategories.children

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
						{menuCategories?.map((item, index) => (
							<Route
								key={index}
								path={`${item.name!.split(' ').join('-').toLowerCase()}`}
								element={<SingleCategoryPage name={item.name!} />}
							/>
						))}
					</Route>
					<Route path=":categorySlug/:idSlug/*" element={<SinglePostPage />} />
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

					<Route path="room" element={<AdminRoomPage />} />

					<Route path="posts/">
						<Route path="listofposts" element={<ListOfPostPage />} />
						<Route path="addpost" element={<AddPostPage />} />
						<Route path="editpost" element={<EditPostPage />} />
						<Route path="categories" element={<CategoriesPage />} />
						<Route path="change-history" element={<PostHistory />} />
					</Route>
					<Route path="users/">
						<Route path="list" element={<ListPage />} />
						<Route path="adduser" element={<AddUserPage />} />
						<Route path="permissions" element={<RoleAndPermissionsPage />} />
						{/* <Route path="profile/:userId" element={<ProfilePage />} /> */}
					</Route>
					<Route path="comments/">
						<Route path="list" element={<ListOfCommentsPage />} />
						<Route path="settings" element={<CommentsSettingsPage />} />
					</Route>
				</Route>

				{/* Settings */}
				<Route
					path="/settings"
					element={
						<Suspense fallback={<Loader />}>
							<SettingsLayout />
						</Suspense>
					}>
						<Route index element={<SettingsPage/>}/>
					<Route path="account/">
						<Route path="profile/info" element={<ProfilePage />} />
					</Route>
				</Route>
				{/* 404 */}
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</Router>
	)
}

export default App
