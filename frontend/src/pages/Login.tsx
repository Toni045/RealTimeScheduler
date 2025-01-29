import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            if (!isLoading && isAuthenticated) {
                // Redirect to the root `/` after successful login
                navigate('/');
            }
        };

        checkAuth();
    }, [isAuthenticated, isLoading, navigate]);

    const handleLogin = async () => {
        try {
            await loginWithRedirect({
                appState: { returnTo: '/' }, // Redirect to root `/`
            });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLogout = async () => {
        await logout({logoutParams: {
            returnTo: window.location.origin, // Redirect to `http://localhost:3000` after logout
        }});
    };

    return (
        <div>
            <h1>Login</h1>
            <p>Welcome to Real-Time Scheduler. Please log in to continue.</p>
            <button onClick={handleLogin}>Log In</button>
            <button onClick={handleLogout}>Log Out</button>
            <div>
                <p>Debug Info:</p>
                <p>isLoading: {String(isLoading)}</p>
                <p>isAuthenticated: {String(isAuthenticated)}</p>
            </div>
        </div>
    );
};

export default Login;
