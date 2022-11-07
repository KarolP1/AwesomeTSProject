import {checkStringNull} from './../../recipes/editRecipe/functions';
import {IEstablishment} from './../../Profile/types';
import {getTokensKeychain} from './../../../utils/localStorage/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {instance} from '../../interceptors';

export interface FilterInterface {
  city?: string;
  country?: string;
  cuisine?: string;
  buildingnumber?: string;
  postcode?: string;
  street?: string;
  isHalal?: string;
  isVegan?: string;
  isKosher?: string;
  type?: string;
  lat?: string;
  lang?: string;
}
export const GetNerbayEstablishment = createAsyncThunk<
  IResponseGetNerbayEstablishment,
  FilterInterface | undefined
>('Establishment/get/nerbay}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    let params = constructParamsString(state);
    console.log(params);
    const res = await instance
      .get(`/order/establishment/find?${params}`, {
        headers: {Authorization: 'Bearer ' + tokens?.access_token},
      })
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

export interface IResponseGetNerbayEstablishment {
  error: any | undefined;
  message: string | undefined;
  data?: IEstablishment[] | null;
  isLoading: boolean;
  succes: boolean;
}

const constructParamsString = (params: FilterInterface | undefined): string => {
  let paramsString = '';
  if (params) {
    if (checkStringNull(params.buildingnumber))
      paramsString += params.buildingnumber;
    if (checkStringNull(params.city)) paramsString += params.city;
    if (checkStringNull(params.country)) paramsString += params.country;
    if (checkStringNull(params.cuisine)) paramsString += params.cuisine;
    if (checkStringNull(params.isHalal)) paramsString += params.isHalal;
    if (checkStringNull(params.isKosher)) paramsString += params.isKosher;
    if (checkStringNull(params.isVegan)) paramsString += params.isVegan;
    if (checkStringNull(params.lang)) paramsString += params.lang;
    if (checkStringNull(params.lang)) paramsString += params.lang;
    if (checkStringNull(params.postcode)) paramsString += params.postcode;
    if (checkStringNull(params.street)) paramsString += params.street;
    if (checkStringNull(params.type)) paramsString += params.type;
  }

  return paramsString;
};
