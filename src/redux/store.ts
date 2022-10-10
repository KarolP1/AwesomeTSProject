import {getShoppinglists} from './recipes/shoppingList/getShoppinglists.thunk';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counter from './testRedux';
import authSlice from './rootReducer';
import loginSlice from './Auth/loginReducer';
import registerSlice from './Auth/registerReducer';
import recipesSlice from './recipes';
import recipesByTagSlice from './recipes/searchByTag';
import addRecipeSlice from './recipes/addRecipe/addRecipe';
import myRecipesSlice from './recipes/myRecipes/myRecipes.slice';
import addShoppingListSlice from './recipes/shoppingList/addShoppingList.slice';
import getShoppingListSlice from './recipes/shoppingList/getShoppingList.slice';
import editShoopingListSlice from './recipes/shoppingList/updateShoppingList.slice';
import AppSetupSlice from './App/setup.sicle';

import getProfileSlice from './Profile/profileCore.slice';

export const store = configureStore({
  reducer: {
    App: AppSetupSlice,
    auth: authSlice,
    login: loginSlice,
    register: registerSlice,
    recipes: recipesSlice,
    recipesByTag: recipesByTagSlice,
    addRecipe: addRecipeSlice,
    myRecipes: myRecipesSlice,
    addShoppingList: addShoppingListSlice,
    getShoppinglists: getShoppingListSlice,
    edistShoppingList: editShoopingListSlice,
    profile: getProfileSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
