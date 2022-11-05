import {getShoppinglists} from './getShoppinglists.thunk';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IResponseGetShoppingLists,
  IResponseGetSingleShoppingList,
} from '../types';
import {addShoppingListThunk} from './addShoppinglist.thunk';
import {deleteShoppingListThunk} from './deleteShoppingList.thunk';
import {editShoppingListThunk} from './updateShoppinglist.thunk';

const initialState: IResponseGetShoppingLists = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const shoppingList = createSlice({
  name: 'ShoppingLists',
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
    //#region get lists
    builder.addCase(getShoppinglists.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.data = null;
      state.isLoading = false;
    });
    builder.addCase(
      getShoppinglists.fulfilled,
      (state, {payload}: PayloadAction<IResponseGetShoppingLists>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload?.message;
      },
    );
    builder.addCase(getShoppinglists.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion

    //#region delete shoppingLists
    builder.addCase(deleteShoppingListThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(
      deleteShoppingListThunk.fulfilled,
      (state, {payload}: PayloadAction<IResponseGetSingleShoppingList>) => {
        state.error = null;
        state.succes = true;
        state.isLoading = false;
        state.message = payload?.message;
        const filteredShoppingLists = state.data?.filter(
          shoppingList => shoppingList._id !== payload.data?._id,
        );
        console.log({filteredShoppingLists: filteredShoppingLists?.length});
        state.data = filteredShoppingLists;
      },
    );
    builder.addCase(deleteShoppingListThunk.pending, state => {
      state.isLoading = true;
    });
    //#endregion

    //#region add list
    builder.addCase(addShoppingListThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(
      addShoppingListThunk.fulfilled,
      (state, {payload}: PayloadAction<IResponseGetSingleShoppingList>) => {
        console.log(state.data?.length);
        state.error = null;
        state.succes = true;
        state.isLoading = false;
        state.message = payload?.message;
        console.log({payload: payload.data});
        if (payload.data) state.data?.push(payload.data);
        console.log(state.data?.length);
      },
    );
    builder.addCase(addShoppingListThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion

    //#region edit list
    builder.addCase(editShoppingListThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(
      editShoppingListThunk.fulfilled,
      (state, {payload}: PayloadAction<IResponseGetSingleShoppingList>) => {
        state.error = null;
        state.succes = true;
        state.isLoading = false;
        state.message = payload?.message;
        // if (payload.data) state.data?.push(payload.data);
      },
    );
    builder.addCase(editShoppingListThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
  },
});

export const getshoppingListError = () =>
  useSelector((state: RootState) => state.shoppingList.error);
export const {cleanUpshoppingList} = shoppingList.actions;
export default shoppingList.reducer;
