import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  // baseURL: 'https://social-app-development-347u5kv2kq-uc.a.run.app/api/',
  baseURL: 'http://localhost:3015/api/',
  responseType: 'json'
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
