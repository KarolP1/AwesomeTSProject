import {IManualList} from './../../Pages/signedIn/recipes/Recipesadd';
import {ImagePickerResponse} from 'react-native-image-picker';

export interface IRecipe {
  _id: string;
  owner: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    name: string;
  };
  isEstablishment: boolean;
  title: string;
  description: string;
  cuisine: ICuisine;
  advancement: number;
  prepTime: string;
  cookTime: string;
  serves: number;
  isKosher: boolean;
  isVegan: boolean;
  isHalal: boolean;
  dishesType: string;
  ingredients: IIngredient[];
  manual: IManualList[];
  tipTitle: string;
  tipDescription: string;
  tipIngredients: IIngredient[];
  tipManual: IManualList[];
  tags: string[];
  counter: ICounter;
  __v: 0;
}

export interface ICuisine {
  _id: string;
  code: string;
  name: string;
  oryginalName: string;
}

export interface ICounter {
  _id: string;
  numberOfClicks: number;
  numberOfLikes: number;
  numberOfShares: number;
  whoLike: string[];
  whoShare: string[];
  __v: 0;
}

export interface IIngredient {
  qtt: number;
  unit: string;
  name: string;
  _id: string;
}

interface OwnerInterface {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
}

interface CuisineInterface {
  _id: string;
  code: string;
  name: string;
  oryginalName: string;
}

interface IngredientInterface {
  qtt: string;
  unit: string;
  name: string;
  _id: string;
}

interface ManualInterface {
  stepNumber: string;
  description: string;
  _id: string;
  image?: any;
}

interface ResponseDataAddRecipe {
  owner: OwnerInterface;
  isEstablishment: boolean;
  title: string;
  description: string;
  cuisine: CuisineInterface;
  advancement: number;
  prepTime: string;
  cookTime: string;
  serves: number;
  isKosher: boolean;
  isVegan: boolean;
  isHalal: boolean;
  dishesType: string;
  ingredients: IngredientInterface[];
  manual: ManualInterface[];
  tipTitle: string;
  tipDescription: string;
  tipIngredients: IngredientInterface[];
  tipManual: ManualInterface[];
  tags: string[];
  counter: {
    _id: string;
    numberOfClicks: number;
    numberOfLikes: number;
    numberOfShares: number;
    whoLike: any[];
    whoShare: any[];
  };
  _id: string;
}

export interface IResponseAddRecipe {
  error: any | undefined;
  message: string | undefined;
  data?: ResponseDataAddRecipe | null;
  isLoading: boolean;
  succes: boolean;
}
