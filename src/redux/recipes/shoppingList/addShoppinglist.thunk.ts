import {IRecipeAdd} from './../../../Pages/signedIn/recipes/Recipesadd';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {
  IResponseAddRecipe,
  IIngredient,
  IResponseAddShoppingList,
} from './../types';
import {IResponseRegisterResponse} from '../../Auth/AuthTypes';

export const addShoppingListThunk = createAsyncThunk<
  IResponseAddShoppingList,
  {
    recipeId: string;
    recipeIngredients: IIngredient[];
    recipeTipIngredients: IIngredient[];
  }
>('shoppingList/add', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .post(
        `/recipes/shoppingList/${state.recipeId}`,
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
});
