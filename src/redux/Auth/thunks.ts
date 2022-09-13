import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  ILoginForm,
  IRegisterForm,
  IResponseLoginIResponseLogin,
  IResponseRegisterResponse,
} from './AuthTypes';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
axios.defaults.baseURL = 'http://146.59.13.245:3000/api/v1/user';

export const loginThunk = createAsyncThunk<
  IResponseLoginIResponseLogin,
  ILoginForm,
  {}
>('user/login', async (state, {rejectWithValue}) => {
  try {
    if (state.email === '' || state.password === '') {
      return rejectWithValue({
        data: null,
        error: null,
        message: 'no data provided',
      });
    }
    const res = await axios
      .post('/login', {
        login: state.email,
        password: state.password,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return rejectWithValue(error.response.data);
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

export const registerThunk = createAsyncThunk<
  IResponseRegisterResponse,
  IRegisterForm
>('user/register', async (state, {rejectWithValue}) => {
  try {
    const res = await axios
      .post('/register', state)
      .then(response => {
        return response.data;
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
