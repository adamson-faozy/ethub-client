import { ReactElement, createContext, useContext, useState } from "react";

interface AuthContextType {
    auth: string | null;
    setAuth: (auth: string | null) => void;
}


const AuthContext = createContext<AuthContextType | null>(null);

type ChildrenType = { children?: React.ReactElement }

export const AuthProvider = ({ children }: ChildrenType) => {
    const [auth, setAuth] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;

