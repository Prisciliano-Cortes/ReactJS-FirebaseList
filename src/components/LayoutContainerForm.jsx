import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../context/UserProvider";

export const LayoutContainerForm = () => {
    const { user } = useContext(UserContext);

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="max-w-sm mx-auto mt-10">
            <Outlet />
        </div>
    );
}