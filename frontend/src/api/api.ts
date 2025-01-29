// src/api/api.js
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const API_BASE_URL = 'http://localhost:8080/api'; // Backend URL

// Create an axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token dynamically
api.interceptors.request.use(
    async (config) => {
        // Get the token dynamically using useAuth0
        const { getAccessTokenSilently } = useAuth0();
        try {
            const token = await getAccessTokenSilently();
            if (token) {
                // Add the Authorization header
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting token:', error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
