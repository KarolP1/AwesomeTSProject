import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';

const initialState: {isViewScrollable: boolean; scrollPosition: number} = {
  isViewScrollable: true,
  scrollPosition: 0,
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
  },
});

export const {setIsViewScrollable, setScrollPosition} = AppSetup.actions;
export default AppSetup.reducer;
