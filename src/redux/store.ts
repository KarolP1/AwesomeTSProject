import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import FindNerbayEstablishmentSlice from './Order/Establishments/getNerbayEstablishments.slice';
import MyEstablishmentSlice from './Order/MyEstablishment/editEsablishment.slice';

import getProfileSlice from './Profile/profileCore.slice';
import {ShoppingCartSlice} from './Order/shoppingCart.slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [
    'auth',
    'login',
    'register',
    'recipes',
    'recipesByTag',
    'addRecipe',
    'editRecipe',
    'myRecipes',
    'profile',
    'establishment',
    'employees',
    'employeesAccept',
    'MyEstabishmentMenus',
    'shoppingList',
    'findNerbayEstablishment',
    'MyEstablishment',
    // 'ShoppingCart',
  ], //blacklisting a store attribute name, will not persist that store attribute.
};

const rootReducer = combineReducers({
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
  findNerbayEstablishment: FindNerbayEstablishmentSlice,
  MyEstablishment: MyEstablishmentSlice,
  ShoppingCart: ShoppingCartSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
