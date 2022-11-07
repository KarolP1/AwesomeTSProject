import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../../hooks';
import {IEstablishment} from '../../Profile/types';
import {
  GetNerbayEstablishment,
  IResponseGetNerbayEstablishment,
} from './getNerbayEstablishments.thunk';

const initialState: IResponseGetNerbayEstablishment = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const NerbayEstablishmentSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    cleanUpEstablishment: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(GetNerbayEstablishment.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      GetNerbayEstablishment.fulfilled,
      (
        state,
        {payload}: PayloadAction<IResponseGetNerbayEstablishment | any>,
      ) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(GetNerbayEstablishment.pending, (state, {payload}) => {
      state.isLoading = true;
    });
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.findNerbayEstablishment.error);
export const {cleanUpEstablishment} = NerbayEstablishmentSlice.actions;
export default NerbayEstablishmentSlice.reducer;
