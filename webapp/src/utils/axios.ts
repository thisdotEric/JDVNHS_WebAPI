import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'api/',
});

export default instance;
