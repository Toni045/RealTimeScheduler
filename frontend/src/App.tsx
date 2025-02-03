import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './pages/Login';
import Home from './pages/Home';
import { CircularProgress, Box } from '@mui/material';
import {setAuth0Client} from "./api/authService";

const App: React.FC = () => {
    const auth0 = useAuth0();

    useEffect(() => {
        setAuth0Client(auth0);  // ✅ Pass it to the helper
    }, [auth0]);


    if (auth0.isLoading) {
        // Show a loading spinner while Auth0 is checking authentication
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!auth0.isAuthenticated) {
        // Redirect unauthenticated users to the login page
        return <Login />;
    }

    return (
        <Routes>
            {/* Root path (`/`) renders the Home component */}
            <Route path="/" element={<Home />} />
        </Routes>
    );
};

export default App;
