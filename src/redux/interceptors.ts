import axios from 'axios';
export const instance = axios.create({
  baseURL: 'http://146.59.13.245:3000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});
