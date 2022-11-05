import axios from 'axios';
import history from './history';
import { getJwt, clearJwt } from 'utils/jwt';

const apiUtil = () => {
  const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
  });

  api.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${getJwt()}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const response = error.response;
      if (!response || response.status === 401) {
        clearJwt();
        history.push('/');
      }
      return response;
      // Reset stuff, do what you want
    },
  );

  return api;
};

export default apiUtil;
