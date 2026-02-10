import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in your environment variables.");
}

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000, // 5 seconds
});

export default axiosInstance;

