import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  config.headers = {
    ...(config.headers || {}),
    'X-Client-Platform': 'React-Native',
  };
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const url = response?.config?.url || '';
    if (response.status === 200 && /auth\/login/i.test(url)) {
      return { data: { success: true, token: 'simulated_token_xyz' }, status: 200 };
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
