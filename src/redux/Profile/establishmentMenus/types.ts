import {ICounter} from '../../recipes/types';

export interface IResponseGetMyEstablishmentMenus {
  error: any | undefined;
  message: string | undefined;
  data?: IGetMenuTitles[] | null;
  isLoading: boolean;
  succes: boolean;
}

export interface IIngredientEstablishment {
  qtt: string;
  unit: string;
  name: string;
  isIngredientVisible: boolean;
  isIngredientEditable: boolean;
}

export interface IMenuItem {
  _id?: string;
  dishName: string;
  isDishForDelivery: boolean;
  price: string;
  currency: string;
  dishDescription: string;
  dishIngredients?: IIngredientEstablishment[];
  spiceness: string;
  isVegan: boolean;
  isKosher: boolean;
  isHalal: boolean;
  category: string;
  counter?: ICounter;
}

export interface IIsCategoryVisible {
  isVisible: boolean;
  categoryName: string;
  _id: string;
}

export interface IGetMenuTitles {
  _id: string;
  menuName: string;
  establishmentId: string;
  isOurMenuSubmenuVisible: boolean;
  menuItems: IMenuItem[] | [];
  categoryVisibility: IIsCategoryVisible[];
}
