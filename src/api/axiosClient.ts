import axios from 'axios';

const LOCAL_BASE_PATH = 'http://localhost:8080/api/';
const BASE_PATH = 'https://eco-bites-backend-868777431305.europe-west2.run.app/api/';

export const userId = 'F607UuDlxWJXhqy94GD7'; // TODO: remove from public

const axiosClient = axios.create({
  baseURL: BASE_PATH,
  headers: {
    accept: 'application/json',
  },
});

export const axiosClientLocal = axios.create({
  baseURL: LOCAL_BASE_PATH,
  headers: {
    accept: 'application/json',
  },
});

export default axiosClient;
