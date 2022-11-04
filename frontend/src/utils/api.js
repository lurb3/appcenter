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
      console.log('Api response: ', response.data);
      return response.data;
    },
    (error) => {
      const response = error.response;
      console.log(response.status);
      if (response.status === 401) {
        clearJwt();
        history.push('/');
      }
      console.log('API response error: ', error.response);
      // Reset stuff, do what you want
    },
  );

  return api;
};

export default apiUtil;
