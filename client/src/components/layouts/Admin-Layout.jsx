import { Navigate, NavLink, Outlet } from "react-router-dom";
import { ImUsers } from "react-icons/im";
import { RiContactsBook3Line } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { useAuth } from "../../store/auth";



export const AdminLayout =() => {
    const {user, isLoading} = useAuth();
    console.log("admin layout", user);

    if(isLoading){
        return <h1>Loading...</h1>
    }

    if(!user.isAdmin){
        return <Navigate to = "/"/>;
    }
    return <>
        <header>
            <div className="container">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/admin/users" >
                            <ImUsers />Users</NavLink>

                        </li>
                        <li>
                            <NavLink to="/admin/contacts">
                            <RiContactsBook3Line />Contact</NavLink>

                        </li>
                        <li>
                            <NavLink to="/service">
                            <MdOutlineMiscellaneousServices />Services</NavLink>

                        </li>
                        <li>
                            <NavLink to="/">
                            <IoIosHome />Home</NavLink>

                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet/>
        </>
};