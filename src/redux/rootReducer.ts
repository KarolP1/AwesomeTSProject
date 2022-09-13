import {useSelector} from 'react-redux';
import {RootState} from './store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const authInitialState: {isLoading: boolean; isAuth: boolean} = {
  isLoading: false,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'counter',
  initialState: authInitialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const {setIsLoading, setIsAuth} = authSlice.actions;
export const getAppStatus = () =>
  useSelector((state: RootState) => state.auth.isLoading);

export const getIsAuth = () =>
  useSelector((state: RootState) => state.auth.isAuth);

export default authSlice.reducer;
