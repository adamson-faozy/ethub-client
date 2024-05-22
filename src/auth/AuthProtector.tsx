import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./protected/AuthProvider";
import { getCurrentUser } from "../services/login.service";
import { useEffect } from "react";


type Roles = {
    allowedRoles: string[],
}

type State = {}



const AuthProtector = () => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    console.log('auth is:', auth);


    console.log('auth after: ', auth)
    return (
        auth ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default AuthProtector;