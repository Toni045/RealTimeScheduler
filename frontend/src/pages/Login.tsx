import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, CircularProgress } from '@mui/material';

const Login: React.FC = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
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

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#f4f6f8', // Apply background color here
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f4f6f8', // Single background color for the whole page
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" align="center" color="primary" gutterBottom>
                    Real-Time Scheduler
                </Typography>
                <Typography variant="body1" align="center" sx={{ marginBottom: 3 }}>
                    Welcome to the Real-Time Scheduler. Please log in to continue.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={handleLogin}
                        sx={{
                            marginBottom: 2,
                            padding: '12px 0',
                            fontSize: '16px',
                        }}
                    >
                        Log In with Auth0
                    </Button>

                    <Typography
                        variant="body2"
                        align="center"
                        color="textSecondary"
                        sx={{ marginTop: 2 }}
                    >
                        Don't have an account?{' '}
                        <a href="https://auth0.com/signup" target="_blank" rel="noopener noreferrer">
                            Sign up here
                        </a>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
