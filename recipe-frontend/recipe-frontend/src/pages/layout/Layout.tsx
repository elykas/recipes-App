import { Outlet } from "react-router-dom"
import NavBar from "../../components/NavBar/NavBar"

const Layout = () => {
    return (
        <div>
            <NavBar/>
            <div className="p-6">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout