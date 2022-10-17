import {IEstablishment} from './../Profile/types';
import {useAppSelector} from './../hooks';
import {
  Action,
  ActionCreator,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {GetEstablishment, IResponseGetMyEstablishment} from './order.thunk';
import {editMyEstablishmentAddress} from '../Profile/core/profileAddressEstablishmentEdit.thunk';

const initialState: IResponseGetMyEstablishment = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const MyEstablishmentSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    cleanUpGetMyProfile: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(GetEstablishment.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      GetEstablishment.fulfilled,
      (state, {payload}: PayloadAction<IEstablishment | any>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(GetEstablishment.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ////////////////////////////////////////////////////////////////
    builder.addCase(editMyEstablishmentAddress.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      editMyEstablishmentAddress.fulfilled,
      (state, {payload}: PayloadAction<IEstablishment | any>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(editMyEstablishmentAddress.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ////////////////////////////////////////////////////////////////
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.establishment.error);
export const {cleanUpGetMyProfile} = MyEstablishmentSlice.actions;
export default MyEstablishmentSlice.reducer;
