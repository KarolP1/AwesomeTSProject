import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {IResponseGetMyRecipes} from '../types';
import {getMyRecipes} from './myRecipes.thunk';
import {deleteRecipe} from '../recipesThunks';

const initialState: IResponseGetMyRecipes = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const MyRecipes = createSlice({
  name: 'myRecipes',
  initialState,
  reducers: {
    cleanUpAddRecipe: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMyRecipes.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(getMyRecipes.fulfilled, (state, {payload}: AnyAction) => {
      state.error = null;
      state.succes = true;
      state.data = payload.data;
      state.isLoading = false;
      state.message = payload.message;
    });
    builder.addCase(getMyRecipes.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ///
    builder.addCase(deleteRecipe.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(deleteRecipe.fulfilled, (state, {payload}: AnyAction) => {
      state.error = null;
      state.succes = true;
      state.data = payload.data;
      state.isLoading = false;
      state.message = payload.message;
    });
    builder.addCase(deleteRecipe.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ///
  },
});

export const getMyRecipesError = () =>
  useSelector((state: RootState) => state.myRecipes.error);
export const {cleanUpAddRecipe} = MyRecipes.actions;
export default MyRecipes.reducer;
