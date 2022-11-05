import {configureStore} from '@reduxjs/toolkit';
import authSlice from './rootReducer';
import loginSlice from './Auth/loginReducer';
import registerSlice from './Auth/registerReducer';
import recipesSlice from './recipes';
import recipesByTagSlice from './recipes/searchByTag';
import addRecipeSlice from './recipes/addRecipe/addRecipe';
import editRecipeSlice from './recipes/editRecipe/editRecipe.slice';
import myRecipesSlice from './recipes/myRecipes/myRecipes.slice';
import AppSetupSlice from './App/setup.sicle';
import EstablishmentSlice from './Order/Establishment.slice';
import EmployeesListSlice from './Order/tables/employees/GetEmployeeList.slice';
import EmployeesAcceptSlice from './Order/tables/employees/establishmentEmployees.slice';
import MyEstabishmentMenus from './Profile/establishmentMenus/EstablishmentMenu.slice';
import ShoppingListSlice from './recipes/shoppingList/shoppinList.slice';

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
    editRecipe: editRecipeSlice,
    myRecipes: myRecipesSlice,
    profile: getProfileSlice,
    establishment: EstablishmentSlice,
    employees: EmployeesListSlice,
    employeesAccept: EmployeesAcceptSlice,
    MyEstabishmentMenus: MyEstabishmentMenus,
    shoppingList: ShoppingListSlice,
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
