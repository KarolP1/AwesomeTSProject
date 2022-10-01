import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {IResponseAddRecipe} from '../types';
import {addShoppingListThunk} from './addShoppinglist.thunk';

const initialState: IResponseAddRecipe = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const shoppingList = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    cleanUpshoppingList: state => {
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
      addShoppingListThunk.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(addShoppingListThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ///
  },
});

export const getshoppingListError = () =>
  useSelector((state: RootState) => state.addShoppingList.error);
export const {cleanUpshoppingList} = shoppingList.actions;
export default shoppingList.reducer;
