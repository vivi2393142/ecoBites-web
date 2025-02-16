import axios from 'axios';

const BASE_PATH = '';

// TODO: add base path
const axiosClient = axios.create({
  baseURL: BASE_PATH,
  headers: {
    accept: 'application/json',
  },
});

export const axiosClientWithoutToken = axios.create({
  baseURL: BASE_PATH,
  headers: {
    accept: 'application/json',
  },
});

export default axiosClient;
