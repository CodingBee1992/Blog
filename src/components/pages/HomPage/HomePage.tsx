// import Loader from "../atoms/loader/Loader"

import { Outlet } from 'react-router'
import Navigation from '../../containers/Navigation/Navigation'

const HomePage = () => {
	return (
		<div>
			{/* <Loader isLoading={true}/> */}
			<Navigation />
			<div>
				<Outlet />
			</div>
		</div>
	)
}

export default HomePage
