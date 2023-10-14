import { useContext } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const classNavLink = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-2";

const classLogout = "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 m-2";

export const Navbar = () => {

    const navigate = useNavigate()

    const { user, signOutUser } = useContext(UserContext)

    const handleLogout = async() => {
        try {
            await signOutUser()

            navigate('/login')
        } catch (error) {
            console.log(error.code);
        }
    }

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link
                    to="/"
                    className="flex items-center"
                >
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        😍 RedirectAPP
                    </span>
                </Link>
                
                <div className="flex md:order-2">
                    {
                        user ? (
                        <>
                            <NavLink
                                to="/"
                                className={classNavLink}
                            >
                                Inicio
                            </NavLink>

                            <button
                                onClick={handleLogout}
                                className={classLogout}
                            >
                                Logout
                            </button>
                        </>
                        ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={classNavLink}
                            >
                                Login
                            </NavLink>
                            
                            <NavLink
                                to="/register"
                                className={classNavLink}
                            >
                                Register
                            </NavLink>
                        </>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}