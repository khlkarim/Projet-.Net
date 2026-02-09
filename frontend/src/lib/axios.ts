import axios, { AxiosInstance } from 'axios';

/**
 * Axios instance for all HTTP requests.
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;
