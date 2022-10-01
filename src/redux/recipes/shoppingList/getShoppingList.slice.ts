import {IResponseGetShoppingLists} from './../types';
import {getShoppinglists} from './getShoppinglists.thunk';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {IResponseAddRecipe} from '../types';
import {addShoppingListThunk} from './addShoppinglist.thunk';

const initialState: IResponseGetShoppingLists = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const shoppingListGet = createSlice({
  name: 'shoppingListGet',
  initialState,
  reducers: {
    cleanUpshoppingListGet: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(addShoppingListThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.data = null;
      state.isLoading = false;
    });
    builder.addCase(
      getShoppinglists.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(
      getShoppinglists.rejected,
      (state, {payload}: AnyAction) => {
        state.error = payload;
        state.succes = false;
        state.data = null;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(getShoppinglists.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ///
  },
});

export const getshoppingGetListError = () =>
  useSelector((state: RootState) => state.addShoppingList.error);
export const {cleanUpshoppingListGet} = shoppingListGet.actions;
export default shoppingListGet.reducer;
