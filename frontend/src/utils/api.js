import axios from 'axios';
import { getJwt } from 'utils/jwt';

const apiUtil = () => {
    const api = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`
    })

    api.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${getJwt()}`
      return config
    });
    
    return api;
}

export default apiUtil;