import axios from 'axios';
import { getToken } from '../server/configUser';

const api = axios.create({
    baseURL: 'http://localhost:8081',
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
