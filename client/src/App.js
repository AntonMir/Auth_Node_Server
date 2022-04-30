// routes
import { BrowserRouter as Router } from 'react-router-dom';
// components
import useRoutes from '@components/routes/Routes.js'
import Header from '@components/header/Header.js';
// hooks
import { useAuth } from '@src/hooks/auth.hook.js'
// context
import { AuthContext } from '@src/context/AuthContext.js'
// styles
import 'materialize-css';


export default function App() {

    const { login, logout, refresh, userId, userName, userEmail, accessToken, refreshToken } = useAuth();

    const isAuthenticated = !!accessToken;

    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider
            value={{ login, logout, refresh, userId, userName, userEmail, accessToken, refreshToken, isAuthenticated }}
        >
            <Router>
                <Header />
                {routes}
            </Router>
        </AuthContext.Provider>
    )
}