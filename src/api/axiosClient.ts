import axios from 'axios';

const BASE_PATH = 'https://eco-bites-backend-868777431305.europe-west2.run.app/api/';
export const userId = 'F607UuDlxWJXhqy94GD7'; // TODO: remove from public

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
