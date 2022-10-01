import {IRecipeAdd} from '../../../Pages/signedIn/recipes/Recipesadd';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IResponseGetMyRecipes} from '../types';

export const getMyRecipes = createAsyncThunk<IResponseGetMyRecipes>(
  'recipes/getRecipe}',
  async (_, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      const res = await instance
        .get(`/recipes/findMyRecipes`, {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
        })
        .then(response => {
          return response.data.data;
        })
        .catch(error => {
          return rejectWithValue(error.response.data.message);
        });

      return res;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);
