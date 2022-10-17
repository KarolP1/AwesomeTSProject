import {useDispatch} from 'react-redux';
import {AnyAction, Dispatch} from 'redux';
import {IRecipe} from '../recipes/types';
export interface ILoginForm {
  email?: string;
  password?: string;
}
export interface ITokenForm {
  token?: string | undefined;
}
export const initialLoginForm: ILoginForm = {
  email: 'platek549@restaurant.com',
  password: '123456',
};
export interface IResponseLoginIResponseLogin {
  isLoading?: boolean;
  message?: string;
  error: any;
  data?: {
    access_token?: string;
    refresh_token?: string;
  };
  succes: boolean;
}
export interface IResponseRecipes {
  isLoading?: boolean;
  message?: string;
  error: any;
  data?: IRecipe[] | [];
  succes: boolean;
}
export interface IResponseRecipesByTag {
  isLoading?: boolean;
  message?: string;
  error?: any;
  data?: {
    filteredRecipesByTag: IRecipe[] | [];
    filteredRecipesByOwner: IRecipe[] | [];
    filteredByRecipeName: IRecipe[] | [];
    filteredByRecipeDescription: IRecipe[] | [];
    filteredByRecipeCuisine: IRecipe[] | [];
    filteredByRecipeDinnerType: IRecipe[] | [];
  };
  succes: boolean;
}
export interface IResponseRegisterResponse {
  isLoading?: boolean;
  message?: string;
  error?: any | null;
  data?: IRegisterForm | null;
  succes: boolean;
}

export type addressType = {
  country: string;
  city: string;
  state: string;
  postcode: string;
  street: string;
  buildingnumber: string;
};

export interface IRegisterForm {
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
  address: addressType;
  birth_year: string;
  userRole: string;
}

export const initialAddress = {
  country: 'poland',
  city: 'rybna',
  state: 'lesser poland',
  postcode: '32-061',
  street: 'dluga',
  buildingnumber: '28',
};
export const initialRegosterForm: IRegisterForm = {
  first_name: 'karol',
  last_name: 'platek',
  email: 'platek549@gmail.com',
  name: 'stary',
  phone_number: '783835385',
  password: '123456',
  confirmPassword: '123456',
  address: initialAddress,
  birth_year: '17-10-1997',
  userRole: '',
};

export interface IResponseRecipeDelete {
  isLoading?: boolean;
  message?: string;
  error?: any;
  data?: IRecipe[];
  succes: boolean;
}
