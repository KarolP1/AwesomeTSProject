import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {AppDispatch} from './store';
import axios from 'axios';
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
export const refreshTokenInterveptor = (
  dispatch: AppDispatch,
  instance: any,
) => {
  const refreshAuthLogic = async (failedRequest: any) => {
    const tokens = await getTokensKeychain();
    await axios
      .post(
        '/user/token',
        {token: tokens?.refresh_token},
        {headers: {Authorization: 'Bearer ' + tokens?.access_token}},
      )
      .then(async tokenRefreshResponse => {
        await setTokensToStorage(tokenRefreshResponse.data.data);
        dispatch(setAuthState(tokenRefreshResponse.data.data));
        failedRequest.response.config.headers['Authorization'] =
          'Bearer ' + tokenRefreshResponse.data.data.access_token;

        return Promise.resolve();
      })
      .catch(e => {
        if (
          e.response.data.message ===
          'Invalid request. Token is not same in store.'
        ) {
          dispatch(cleanUpLogin());
          logout();
          dispatch(setAuthState(false));
        }
      });
  };
  //
  return createAuthRefreshInterceptor(instance, refreshAuthLogic);
};
