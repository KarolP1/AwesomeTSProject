import {IRecipeAdd} from './../../../Pages/signedIn/recipes/Recipesadd';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IResponseAddRecipe} from './../types';
import {IResponseRegisterResponse} from '../../Auth/AuthTypes';
import {checkIfAddRecipeIsCorrect} from './functions';

export const addRecipeThunk = createAsyncThunk<IResponseAddRecipe, IRecipeAdd>(
  'recipes/addRecipe',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      const check = checkIfAddRecipeIsCorrect(state);
      if (check) {
        return rejectWithValue('Wrong data provided');
      }
      const res = await instance
        .post('/recipes/recipe', state, {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
        })
        .then(response => {
          console.log(response);
          return response.data.data;
        })
        .catch(error => {
          console.error(error.response.data);
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
