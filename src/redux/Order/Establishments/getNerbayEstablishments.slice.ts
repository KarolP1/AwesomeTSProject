import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  CounterLikeEstablishment,
  IResponseCounterLikeEstablishment,
} from '../../counters/likeEstablishment.thunk';
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
    cleanFindNerbayEstablishmentSlice: state => {
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
    builder.addCase(CounterLikeEstablishment.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    builder.addCase(CounterLikeEstablishment.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      CounterLikeEstablishment.fulfilled,
      (state, {payload}: PayloadAction<IResponseCounterLikeEstablishment>) => {
        state.error = null;
        state.succes = true;
        if (state.data) {
          const editedEstblishmentList = state.data.map(establishment => {
            if (establishment._id === payload.data?.establishmentId) {
              establishment.counter[0] = payload.data.counterFromDbres;
              return establishment;
            } else {
              return establishment;
            }
          });
          if (state.data && editedEstblishmentList !== undefined) {
            state.data =
              editedEstblishmentList && editedEstblishmentList.length !== 0
                ? editedEstblishmentList
                : null;
          }
        }

        state.isLoading = false;
        state.message = payload.message;
        CounterLikeEstablishment;
      },
    );
    builder.addCase(GetNerbayEstablishment.pending, (state, {payload}) => {
      state.isLoading = true;
    });
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.findNerbayEstablishment.error);
export const {cleanFindNerbayEstablishmentSlice} =
  NerbayEstablishmentSlice.actions;
export default NerbayEstablishmentSlice.reducer;
