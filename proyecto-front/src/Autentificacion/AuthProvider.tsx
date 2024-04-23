import React, { useContext, createContext, useState } from "react";
import type { AuthResponse } from "../types/types";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    isAuthenticated: boolean;
    getAccessToken: () => string;
    getRefreshToken: () => string | null; // Puedes cambiar el tipo según tus necesidades
    saveUser: (userData: AuthResponse) => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    getAccessToken: () => "",
    getRefreshToken: () => null,
    saveUser: (userData: AuthResponse) => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string>('');

    function getAccessToken() {
        return accessToken;
    }

    function getRefreshToken() {
        const Token = localStorage.getItem('Token');
        if (Token) {
            const { refreshToken } = JSON.parse(Token);
            return refreshToken;
        }
        return null;
    }

    function saveUser(userData: AuthResponse) {
        setAccessToken(userData.body.accessToken.toString());
        localStorage.setItem('Token', JSON.stringify(userData.body.refreshToken));
        setIsAuthenticated(true);
    }

    const contextValue: AuthContextType = {
        isAuthenticated,
        getAccessToken,
        getRefreshToken,
        saveUser,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
