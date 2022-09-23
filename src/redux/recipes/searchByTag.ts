import {getRecipes} from './index';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {setIsLoading} from '../rootReducer';
import {IResponseRecipesByTag} from '../Auth/AuthTypes';
import {getAllRecipesByTag} from './recipesThunks';

const initialState: IResponseRecipesByTag = {
  error: undefined,
  message: undefined,
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
  name: 'recipesByTag',
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
        state.data = undefined;
      },
    );

    builder.addCase(getAllRecipesByTag.fulfilled, (state, {payload}: any) => {
      state.data = payload.data;
      state.message = JSON.stringify(payload.message);
      state.isLoading = false;
      state.succes = true;
    });

    builder.addCase(getAllRecipesByTag.pending, (state, action: AnyAction) => {
      state.isLoading = true;
      state.succes = false;
    });
  },
});

export const getRecipesErrorbyTag = () =>
  useSelector((state: RootState) => state.recipesByTag.error);
export const {cleanUpRecipesByTag} = RecipesByTag.actions;
export default RecipesByTag.reducer;
