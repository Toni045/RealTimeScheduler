import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './pages/Login';
import Home from './pages/Home';
import { CircularProgress, Box } from '@mui/material';

const App: React.FC = () => {
    const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const getToken = async () => {
            try {
                if (isAuthenticated) {
                    const token = await getAccessTokenSilently();
                    console.log('Access token acquired:', token);
                    console.log('User:', user);
                }
            } catch (error) {
                console.error('Error getting token:', error);
            }
        };

        getToken();
    }, [isAuthenticated, getAccessTokenSilently, user]);


    if (isLoading) {
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



    return (
        <Routes>
            {/* Root path (`/`) renders the Home component */}
            <Route path="/" element={<Home />} />
        </Routes>
    );
};

export default App;
