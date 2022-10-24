import {IResponseGetMyProfile} from './types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ImagePickerResponse, Asset} from 'react-native-image-picker';
import {getTokensKeychain} from '../../utils/localStorage';
import {instance} from '../interceptors';

export const addMyProfileDocumentImage = createAsyncThunk<
  IResponseGetMyProfile,
  FormData
>('profile/invoices/recipes', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance
      .get(`/profile/invoices/recipes`, {
        headers: {
          Authorization: 'Bearer ' + tokens?.access_token,
          'Content-Type': 'multipart/form-data',
        },
      })
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
