import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

apiClient.interceptors.request.use(config => {
  config.headers['X-Client-Platform'] = 'React-Native';
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 400) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
