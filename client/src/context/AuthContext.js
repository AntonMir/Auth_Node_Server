import { createContext } from "react";

export const AuthContext = createContext({
    accessToken: null,
    refreshToken: null,
    userId: null,
    userName: null,
    userEmail: null,
    login: () => { },
    logout: () => { },
    refresh: () => { },
    isAuthenticated: false
})