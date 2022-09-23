import {getTokensKeychain} from './../../utils/localStorage/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IResponseRecipes, IResponseRecipesByTag} from '../Auth/AuthTypes';
import {instance} from '../interceptors';

export interface ISearchRecipes {
  access_token: string | undefined;
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
          return rejectWithValue(error.response.data);
        });
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue({
        message: error,
        error: error,
        data: null,
      });
    }
  },
);

export const getAllRecipesByTag = createAsyncThunk<
  IResponseRecipesByTag,
  string
>('recipes/getByTag', async (tag, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .get(`/recipes/findByTag/${tag}`, {
        headers: {
          Authorization: 'Bearer ' + tokens?.access_token,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return rejectWithValue(error.response.data);
      });
    return res;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue({
      message: error,
      error: 'login failed',
      data: null,
    });
  }
});
export const getAllRecipesByCategory = createAsyncThunk<
  IResponseRecipesByTag,
  string
>('recipes/getByCategory', async (tag, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .get(`/recipes/findByTag/${tag}`, {
        headers: {
          Authorization: 'Bearer ' + tokens?.access_token,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return rejectWithValue(error.response.data);
      });
    return res;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue({
      message: error,
      error: 'login failed',
      data: null,
    });
  }
});
export const getAllRecipesByCuisine = createAsyncThunk<
  IResponseRecipesByTag,
  string
>('recipes/getByCuisine', async (cuisine, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .get(`/recipes/findByTag/${cuisine}`, {
        headers: {
          Authorization: 'Bearer ' + tokens?.access_token,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return rejectWithValue(error.response.data);
      });
    return res;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue({
      message: error,
      error: 'login failed',
      data: null,
    });
  }
});
