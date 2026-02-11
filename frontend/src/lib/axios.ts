import axios from 'axios';
import { useAuthStore } from '~/features/auth/store/auth.store';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in your environment variables.");
}

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = useAuthStore.getState().token;
    if (token && !request.headers.Authorization?.toString().startsWith('Bearer')) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;

