import React from 'react'
// routes
import { Routes, Route, Navigate } from 'react-router-dom'
// components
import AuthPage from '@components/authPage/AuthPage.js'
import HomePage from '@components/homePage/HomePage.js'


export default function useRoutes(isAuthenticated) {

    if (isAuthenticated) {
        return (
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route exact path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
    )
}