import { Outlet } from "react-router"
import AdminPanelSideBar from "../../components/organism/AdminPanelSideBar/AdminPanelSideBar"
import Navigation from "../Navigation/Navigation"

const AdminPanelLayout = () => {
	return (
		<>
			<Navigation />
			<div>
				<AdminPanelSideBar />
				<Outlet />
			</div>
		</>
	)
}

export default AdminPanelLayout
