import axios from 'axios';
import { getToken } from './authService';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

// ✅ Add token dynamically before each request
api.interceptors.request.use(async (config) => {
    try {
        const token = await getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log('✅ Authorization Header Set:', config.headers['Authorization']);
        }
    } catch (error) {
        console.error('⚠️ Error getting token:', error);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
