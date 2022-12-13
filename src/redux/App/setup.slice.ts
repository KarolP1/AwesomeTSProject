import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';
import {FilterInterface} from '../Order/Establishments/getNerbayEstablishments.thunk';

const initialState: {
  isViewScrollable: boolean;
  scrollPosition: number;
  lastNavigationDirection: string | undefined;
  APPBARHEIGHT: number;
  orderFilters: FilterInterface | null;
} = {
  isViewScrollable: true,
  scrollPosition: 0,
  lastNavigationDirection: undefined,
  APPBARHEIGHT: 0,
  orderFilters: null,
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
    setAppbarHeightState: (state, {payload}: PayloadAction<number>) => {
      state.APPBARHEIGHT = payload;
    },
    setFiltersState: (
      state,
      {payload}: PayloadAction<FilterInterface | undefined>,
    ) => {
      if (payload === undefined) {
        state.orderFilters = null;
      } else {
        state.orderFilters = payload;
      }
    },
  },
});

export const {
  setIsViewScrollable,
  setScrollPosition,
  setLastNavigationDirection,
  setAppbarHeightState,
  setFiltersState,
} = AppSetup.actions;
export default AppSetup.reducer;
