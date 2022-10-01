import {IResponseGetShoppingLists} from './../types';
import {IRecipeAdd} from '../../../Pages/signedIn/recipes/Recipesadd';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';

export const getShoppinglists = createAsyncThunk<IResponseGetShoppingLists>(
  '/recipes/shoppingList/get',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      const res = await instance
        .get(`/recipes/shoppingLists`, {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
        })
        .then(response => {
          return response.data;
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
