import { Outlet } from "react-router-dom"
import { useAuth } from "../auth/protected/AuthProvider";
import { getCurrentUser } from "../services/login.service";
import { useEffect, useState } from "react";

const Layout = () => {

    const { auth, setAuth } = useAuth();

    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        (async () => {
            const authResult = await getCurrentUser(); // hits `/auth/me`
            if (authResult) {
                setAuth(authResult);
            }
            setIsAuthenticating(false);
        })();
    }, []);

    if (isAuthenticating) {
        return "looading"; // or loading or whatever
    }

    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default Layout