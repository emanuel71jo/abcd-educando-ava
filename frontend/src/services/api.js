import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3333' });

api.interceptors.request.use(async (config) => {
  const token = sessionStorage.getItem('@ABCDEducando_login');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
