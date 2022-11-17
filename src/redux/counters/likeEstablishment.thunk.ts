import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../utils/localStorage';
import {instance} from '../interceptors';

export const CounterLikeEstablishment = createAsyncThunk<
  IResponseCounterLikeEstablishment,
  string
>('Counters/likeEstablishment}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .post(
        `/user/counter/addLikeToEstablishment/${state}`,
        {},
        {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
        },
      )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return rejectWithValue(error.response.data.message);
      });
    return res;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message,
      error: 'login failed',
      data: null,
    });
  }
});

export interface IResponseCounterLikeEstablishment {
  error: any | undefined;
  message: string | undefined;
  data?: ICounter | null;
  isLoading: boolean;
  succes: boolean;
}

export interface ICounter {
  establishmentId: string;
  counterFromDbres: {
    _id: string;
    numberOfClicks: number;
    numberOfLikes: number;
    numberOfShares: number;
    whoLike: string[];
    whoShare: string[];
  };
}
