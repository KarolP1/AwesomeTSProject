import {getTokensKeychain} from './../../utils/localStorage/index';
import Keychain from 'react-native-keychain';
import {getTokens} from './../Auth/loginReducer';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  IResponseRecipes,
  IResponseRecipesByTag,
  IResponseRegisterResponse,
} from '../Auth/AuthTypes';
import {instance} from '../interceptors';

export interface ISearchRecipes {
  access_token: string | undefined;
}
export interface ISearchRecipesByTag {
  access_token: string | undefined;
  tag: string;
}

export const getAllRecipes = createAsyncThunk<IResponseRecipes>(
  'recipes/get',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getTokensKeychain();

      const tokenAuth = `Bearer ${token?.access_token}`;
      const res = await instance
        .get('/recipes/recipe', {
          headers: {
            Authorization: tokenAuth,
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
      console.log(error);
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);

export const getAllRecipesByTag = createAsyncThunk<
  IResponseRecipesByTag,
  ISearchRecipesByTag
>('recipes/getByTag', async ({access_token, tag}, {rejectWithValue}) => {
  try {
    const tokenAuth = `Bearer ${access_token}`;
    const res = await instance
      .get(`/recipes/findByTag/${tag}`, {
        headers: {
          Authorization: tokenAuth,
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
    console.log(error);
    return rejectWithValue({
      message: error.message,
      error: 'login failed',
      data: null,
    });
  }
});
