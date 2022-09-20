import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counter from './testRedux';
import authSlice from './rootReducer';
import loginSlice from './Auth/loginReducer';
import registerSlice from './Auth/registerReducer';
import recipesSlice from './recipes';
import recipesByTagSlice from './recipes/searchByTag';

export const store = configureStore({
  reducer: {
    counter: counter,
    auth: authSlice,
    login: loginSlice,
    register: registerSlice,
    recipes: recipesSlice,
    recipesByTag: recipesByTagSlice,
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
