import {WEBCONST} from './../../constants/webConstants';
import {
  getTokensKeychain,
  logout,
  setTokensToStorage,
} from './../../utils/localStorage/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  ILoginForm,
  IRegisterForm,
  IResponseLoginIResponseLogin as IResponseLogin,
  IResponseRegisterResponse,
  ITokenForm,
} from './AuthTypes';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {instance} from '../interceptors';
import {setAuthState, setAuthStatus} from './loginReducer';
axios.defaults.baseURL = `${WEBCONST().APIURL}/api/v1`;

export const loginThunk = createAsyncThunk<IResponseLogin, ILoginForm, {}>(
  'user/login',
  async (state, {rejectWithValue}) => {
    console.warn(state);
    try {
      if (state.email === '' || state.password === '') {
        throw new Error('no data provided');
      }

      const res = await axios
        .post('/user/login', {
          login: state.email,
          password: state.password,
        })
        .then(async response => {
          console.log({response: response.data});
          const tokens = JSON.stringify(response.data.data);
          await Keychain.setGenericPassword('token', tokens);
          return response.data;
        })
        .catch(error => {
          console.error(error.response);
          return rejectWithValue(error.response.data);
        });
      console.log({res});

      return res;
    } catch (error: any) {
      console.log(error.response);
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);
export const tokenThunk = createAsyncThunk<IResponseLogin>(
  'user/token',
  async (_, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      if (!tokens) {
        throw new Error('no tokens');
      } else {
        const res = await instance
          .post(
            '/user/token',
            {
              token: tokens.refresh_token,
            },
            {headers: {Authorization: 'Bearer ' + tokens.access_token}},
          )
          .then(async response => {
            await Keychain.resetGenericPassword();
            await setTokensToStorage(response.data.data);
            return response.data;
          })
          .catch(async error => {
            throw new Error(error.response.data.message);
          });
        return res.data;
      }
    } catch (error: any) {
      console.log({e: error});
      if (
        error?.response?.data?.message ===
        'Invalid request. Token is not same in store.'
      ) {
        return rejectWithValue({
          message: error.message,
          error:
            'tokens failed: ' + JSON.stringify(error.response.data.message),
          data: null,
        });
      } else {
        return rejectWithValue({
          message: error,
          error,
          data: null,
        });
      }
    }
  },
);

export const registerThunk = createAsyncThunk<
  IResponseRegisterResponse,
  IRegisterForm
>('user/register', async (state, {rejectWithValue}) => {
  try {
    const res = await axios
      .post('/user/register', state)
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        return rejectWithValue(error.response.data.message);
      });

    return res;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message,
      error: 'login failed',
      data: null,
    });
  }
});

/**
 *
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzI3YjI5NDFiNmFjN2M4ZDQ4YTljZWMiLCJpYXQiOjE2NjM1ODUyODYsImV4cCI6MTY2MzU4NTU4Nn0.9yhtA00MwARjaW9imJwYsCwncMmgiSKMzppbwguJBwo
 */
