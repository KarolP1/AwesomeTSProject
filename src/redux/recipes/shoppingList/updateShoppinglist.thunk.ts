import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IResponseAddShoppingList, ShoppingListItem} from '../types';

export const editShoppingListThunk = createAsyncThunk<
  IResponseAddShoppingList,
  {
    shoppingListId: string;
    recipeIngredients: ShoppingListItem[];
    recipeTipIngredients: ShoppingListItem[];
  }
>('shoppingList/update', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .put(
        `/recipes/shoppingList/${state.shoppingListId}`,
        {
          recipeIngredients: state.recipeIngredients,
          recipeTipIngredients: state.recipeTipIngredients,
        },
        {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
        },
      )
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
});
