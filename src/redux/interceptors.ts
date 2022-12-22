import {WEBCONST} from './../constants/webConstants';
import {AppDispatch} from './store';
import {useAppDispatch} from './hooks';
import {setTokensToStorage, logout} from './../utils/localStorage/index';
import axios from 'axios';
import {getTokensKeychain} from '../utils/localStorage';
import {setAuthState} from './Auth/loginReducer';

export const instance = axios.create({
  baseURL: `${WEBCONST().APIURL}:${WEBCONST().PORT}/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async config => {
    const token = await getTokensKeychain();
    if (token && config) {
      config.headers['Authorization'] = 'Bearer ' + token.access_token; // for Spring Boot back-end
      config.headers['x-access-token'] = token.access_token; // for Node.js Express back-end
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const test = (dispatch: AppDispatch) => {
  instance.interceptors.response.use(
    res => {
      return res;
    },
    async err => {
      const originalConfig = err.config;

      if (originalConfig.url !== '/user/token' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          const tokens = await getTokensKeychain();

          try {
            const rs = await instance.post('/user/token', {
              token: tokens?.refresh_token,
            });

            const {accessToken} = rs.data.data;
            await setTokensToStorage(accessToken);

            return await instance(originalConfig);
          } catch (_error) {
            logout();
            dispatch(setAuthState(null));

            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    },
  );
};
export default test;
