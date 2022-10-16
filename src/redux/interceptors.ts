import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {AppDispatch} from './store';
import axios, {AxiosInstance} from 'axios';
import {
  getTokensKeychain,
  logout,
  setTokensToStorage,
} from '../utils/localStorage';
import {cleanUpLogin, setAuthState} from './Auth/loginReducer';

export const instance = axios.create({
  baseURL: 'http://146.59.13.245:3000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});
