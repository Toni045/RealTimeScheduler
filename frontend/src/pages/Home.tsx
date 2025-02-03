import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material";
import UserList from "../components/UserList";
import TaskList from "../components/TaskList";
import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

export default function Home() {
    const { logout } = useAuth0(); // Use logoutWithRedirect for redirection after logout

    // Function to handle the logout
    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } }); // Redirects user to homepage after logout
    };

    return (
        <Box
            sx={{
                backgroundColor: '#f0f4f8',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                position: 'relative', // Allow absolute positioning of child elements
            }}
        >
            {/* Logout Button at top-right corner */}
            <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{
                    position: 'absolute', // Position the button absolutely
                    top: 20, // Distance from the top of the page
                    right: 20, // Distance from the right of the page
                }}
            >
                Logout
            </Button>

            <Container>
                <Typography variant="h2" align="center" gutterBottom color="primary">
                    Real-Time Scheduler
                </Typography>

                <Grid
                    container
                    spacing={6}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'stretch', // Ensures children stretch to equal height
                    }}
                >
                    <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                width: '100%',
                                maxWidth: 400,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%', // Takes the full height provided by the parent
                            }}
                        >
                            <UserList />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                width: '100%',
                                maxWidth: 400,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%', // Takes the full height provided by the parent
                            }}
                        >
                            <TaskList />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
