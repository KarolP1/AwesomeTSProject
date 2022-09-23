import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {IResponseRecipes} from '../Auth/AuthTypes';
import {
  getAllRecipes,
  getAllRecipesByCategory,
  getAllRecipesByCuisine,
} from './recipesThunks';

const initialState: IResponseRecipes = {
  error: '',
  message: '',
  data: [],
  isLoading: false,
  succes: false,
};

const Recipes = createSlice({
  name: 'Recipes',
  initialState,
  reducers: {
    cleanUpRecipes: state => {
      state.data = [];
      state.message = undefined;
      state.isLoading = false;
      state.succes = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    ///
    builder.addCase(getAllRecipes.rejected, (state, {payload}: AnyAction) => {
      state.isLoading = false;
      state.error = payload;
      state.succes = false;
      state.data = undefined;
    });
    builder.addCase(getAllRecipes.fulfilled, (state, {payload}: AnyAction) => {
      state.data = payload.data;
      state.message = payload.message;
      state.isLoading = false;
      state.succes = true;
    });
    builder.addCase(getAllRecipes.pending, (state, action: AnyAction) => {
      state.isLoading = true;
      state.succes = false;
    });
    ///
    builder.addCase(
      getAllRecipesByCategory.rejected,
      (state, {payload}: AnyAction) => {
        state.isLoading = false;
        state.error = payload;
        state.succes = false;
        state.data = undefined;
      },
    );
    builder.addCase(
      getAllRecipesByCategory.fulfilled,
      (state, {payload}: AnyAction) => {
        state.data = payload.data.filteredByRecipeDinnerType;
        state.message = payload.message;
        state.isLoading = false;
        state.succes = true;
      },
    );
    builder.addCase(
      getAllRecipesByCategory.pending,
      (state, action: AnyAction) => {
        state.isLoading = true;
        state.succes = false;
      },
    );
    ///
    builder.addCase(
      getAllRecipesByCuisine.rejected,
      (state, {payload}: AnyAction) => {
        state.isLoading = false;
        state.error = payload;
        state.succes = false;
        state.data = undefined;
      },
    );
    builder.addCase(
      getAllRecipesByCuisine.fulfilled,
      (state, {payload}: AnyAction) => {
        state.data = payload.data.filteredByRecipeCuisine;
        state.message = payload.message;
        state.isLoading = false;
        state.succes = true;
      },
    );
    builder.addCase(
      getAllRecipesByCuisine.pending,
      (state, action: AnyAction) => {
        state.isLoading = true;
        state.succes = false;
      },
    );
  },
});

export const getRecipes = () =>
  useSelector((state: RootState) => state.recipes.data);

export const getStatus = () =>
  useSelector((state: RootState) => state.login.succes);

export const getRecipesErrors = () =>
  useSelector((state: RootState) => state.recipes.error?.message);

export const {cleanUpRecipes} = Recipes.actions;

export default Recipes.reducer;
