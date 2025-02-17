import axios from 'axios';

const BASE_PATH = 'https://eco-bites-backend-868777431305.europe-west2.run.app/api/';
export const userId = 'K9hXjVM7kpn8NeTwzLQM'; // TODO: remove from public

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
