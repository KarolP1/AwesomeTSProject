import {editShoppingListThunk} from './updateShoppinglist.thunk';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {IResponseAddRecipe, IResponseGetShoppingLists} from '../types';
import {deleteShoppingListThunk} from './deleteShoppingList.thunk';

const initialState: IResponseGetShoppingLists = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const editShoppingList = createSlice({
  name: 'editShoppingList',
  initialState,
  reducers: {
    cleanupDeleteShoppingList: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },

  extraReducers: builder => {
    builder.addCase(deleteShoppingListThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.data = null;
      state.isLoading = false;
    });

    builder.addCase(
      deleteShoppingListThunk.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );

    builder.addCase(deleteShoppingListThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ///
  },
});

export const deleteShoppingListError = () =>
  useSelector((state: RootState) => state.edistShoppingList.error);
export const {cleanupDeleteShoppingList} = editShoppingList.actions;
export default editShoppingList.reducer;
