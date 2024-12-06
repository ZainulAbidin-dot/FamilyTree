import axios from 'axios';

export const BACKEND_URL = 'https://family-tree-backend-t1qq.onrender.com';

export const axiosClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
