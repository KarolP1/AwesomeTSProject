import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {setIsLoading} from '../rootReducer';
import {IResponseRecipesByTag} from '../Auth/AuthTypes';
import {getAllRecipesByTag} from './recipesThunks';

const initialState: IResponseRecipesByTag = {
  error: '',
  message: '',
  data: {
    filteredRecipesByTag: [],
    filteredRecipesByOwner: [],
    filteredByRecipeName: [],
    filteredByRecipeDescription: [],
    filteredByRecipeCuisine: [],
    filteredByRecipeDinnerType: [],
  },
  isLoading: false,
  succes: false,
};

const RecipesByTag = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    cleanUpRecipesByTag: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    ///
    builder.addCase(
      getAllRecipesByTag.rejected,
      (state, {payload}: AnyAction) => {
        state.isLoading = false;
        state.error = payload;
        state.succes = false;
      },
    );
    builder.addCase(
      getAllRecipesByTag.fulfilled,
      (state, {payload}: AnyAction) => {
        state.data = payload;
        state.message = payload.message;
        state.isLoading = false;
        state.succes = true;
      },
    );
    builder.addCase(getAllRecipesByTag.pending, (state, action: AnyAction) => {
      state.isLoading = true;
      state.succes = false;
    });
  },
});

export const getRecipes = () =>
  useSelector((state: RootState) => state.recipes.data);

export const getStatus = () =>
  useSelector((state: RootState) => state.login.succes);

export const getLoginErrors = () =>
  useSelector((state: RootState) => state.login.error?.message);
export const {cleanUpRecipesByTag} = RecipesByTag.actions;
export default RecipesByTag.reducer;
