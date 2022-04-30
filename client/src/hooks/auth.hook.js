import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {

    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)

    const login = useCallback((userId, userName, userEmail, accessToken, refreshToken) => {
        setUserId(userId);
        setUserName(userName);
        setUserEmail(userEmail)
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        localStorage.setItem('userData', JSON.stringify({
            userId,
            userName,
            userEmail
        }))
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
    }, [])

    const logout = useCallback(() => {
        setUserId(null);
        setUserName(null);
        setUserEmail(null)
        setAccessToken(null);
        setRefreshToken(null);

        localStorage.removeItem('userData');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }, [])

    const refresh = useCallback((accessToken, refreshToken) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'));
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')

        if (data && accessToken && refreshToken) {
            login(data.userId, data.userName, data.userEmail, accessToken, refreshToken)
        }
    }, [login, refresh])

    return {
        login,
        logout,
        refresh,
        userId,
        userName,
        userEmail,
        accessToken,
        refreshToken
    };
}

