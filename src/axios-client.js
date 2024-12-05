import axios from 'axios';

export const BACKEND_URL = 'https://family-tree-backend-production-630e.up.railway.app';

export const axiosClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
