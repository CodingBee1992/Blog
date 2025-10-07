import Loader from "../../components/atoms/loader/Loader"

import { Outlet } from 'react-router'
import Navigation from '../Navigation/Navigation'

const StaticLayout = () => {
	return (
		<div>
			<Loader />
			<Navigation />
			<div>
				<Outlet />
			</div>
		</div>
	)
}

export default StaticLayout
