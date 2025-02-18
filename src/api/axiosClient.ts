import axios from 'axios';

const BASE_PATH = '-';

export const userId = '-';

const axiosClient = axios.create({
  baseURL: BASE_PATH,
  headers: {
    accept: 'application/json',
  },
});

export default axiosClient;
