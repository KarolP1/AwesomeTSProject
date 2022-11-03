import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';

const initialState: {
  isViewScrollable: boolean;
  scrollPosition: number;
  lastNavigationDirection: string | undefined;
} = {
  isViewScrollable: true,
  scrollPosition: 0,
  lastNavigationDirection: undefined,
};

const AppSetup = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setIsViewScrollable: (state, {payload}: PayloadAction<boolean>) => {
      state.isViewScrollable = payload;
    },
    setScrollPosition: (state, {payload}: PayloadAction<number>) => {
      state.scrollPosition = payload;
    },
    setLastNavigationDirection: (state, {payload}: PayloadAction<string>) => {
      state.lastNavigationDirection = payload;
    },
  },
});

export const {
  setIsViewScrollable,
  setScrollPosition,
  setLastNavigationDirection,
} = AppSetup.actions;
export default AppSetup.reducer;
